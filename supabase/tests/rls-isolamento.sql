-- ============================================================
-- Teste de isolamento do RLS — dados de menores.
--
-- Rode no SQL Editor do Supabase depois de qualquer mudança em policy,
-- função de segurança ou tabela nova. Roda inteiro dentro de uma transação
-- com ROLLBACK: não deixa lixo no banco.
--
-- O que ele prova, nesta ordem:
--   1. a policy AVALIA (não estoura permissão na função owns_child)
--   2. uma família não LÊ os dados de outra
--   3. uma família não ESCREVE nos dados de outra
--
-- O item 1 existe porque já quebrou: `revoke execute` na função usada pelas
-- policies fazia o próprio pai levar "permission denied for function
-- owns_child". Não aparecia em build nenhum — só no primeiro login real.
-- ============================================================

begin;

-- ---------- massa de teste: duas famílias ----------
insert into auth.users (id, instance_id, aud, role, email, encrypted_password, created_at, updated_at)
values
  ('aaaaaaaa-0000-4000-8000-000000000001', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'familia.a@teste.local', '', now(), now()),
  ('bbbbbbbb-0000-4000-8000-000000000002', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'familia.b@teste.local', '', now(), now());

insert into public.child_profiles (id, family_id, apelido, faixa_etaria) values
  ('cccccccc-0000-4000-8000-00000000000a', 'aaaaaaaa-0000-4000-8000-000000000001', 'Filho A', '5-7'),
  ('dddddddd-0000-4000-8000-00000000000b', 'bbbbbbbb-0000-4000-8000-000000000002', 'Filho B', '8-10');

insert into public.child_progress (child_id, moedas, xp) values
  ('cccccccc-0000-4000-8000-00000000000a', 111, 111),
  ('dddddddd-0000-4000-8000-00000000000b', 999, 999);

insert into public.learning_events (child_id, tipo, story_id, valor) values
  ('dddddddd-0000-4000-8000-00000000000b', 'historia', 'gn-01-criacao', 'identidade');

-- ---------- a partir daqui, somos a família A ----------
set local role authenticated;
set local request.jwt.claims = '{"sub":"aaaaaaaa-0000-4000-8000-000000000001","role":"authenticated"}';

-- 1 e 2: avalia sem erro, e enxerga só o próprio filho.
-- Esperado: perfis=1, progressos=1, moedas=111, eventos=0, vazamento=0
select
  (select count(*) from public.child_profiles)                                   as perfis_visiveis,
  (select count(*) from public.child_progress)                                   as progressos_visiveis,
  (select coalesce(max(moedas), -1) from public.child_progress)                  as moedas_visiveis,
  (select count(*) from public.learning_events)                                  as eventos_visiveis,
  (select count(*) from public.child_progress
     where child_id = 'dddddddd-0000-4000-8000-00000000000b')                    as vazamento_leitura;

-- 3: tentativa de escrever no filho alheio. Esperado: 0 linhas alteradas.
with tentativa as (
  update public.child_progress set moedas = 0
  where child_id = 'dddddddd-0000-4000-8000-00000000000b'
  returning 1
)
select count(*) as linhas_alteradas_no_filho_alheio from tentativa;

-- Confirma que o dado do outro continua intacto. Esperado: 999.
reset role;
select moedas as moedas_do_filho_B
from public.child_progress
where child_id = 'dddddddd-0000-4000-8000-00000000000b';

rollback;
