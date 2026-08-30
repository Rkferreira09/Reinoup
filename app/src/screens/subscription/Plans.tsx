import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TopBar } from '../../components/ui/TopBar';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { MascotOficial } from '../../components/mascot/MascotOficial';
import { PLANS, ANNUAL_DISCOUNT } from '../../content/plans';
import { useSettingsStore } from '../../store/settingsStore';
import { useAuthStore } from '../../store/authStore';
import { CheckoutPix } from './CheckoutPix';

export function Plans() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPlan = useSettingsStore((s) => s.plan);
  const subscribe = useSettingsStore((s) => s.subscribe);
  const [cycle, setCycle] = useState<'mensal' | 'anual'>('mensal');
  const [selected, setSelected] = useState<typeof PLANS[number]['id']>('completo');
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pixAberto, setPixAberto] = useState(false);
  const emailDaConta = useAuthStore((s) => s.email) ?? '';
  const familyId = useAuthStore((s) => s.familyId);

  // Volta do Stripe Checkout: ?status=success confirma a assinatura de verdade;
  // ?status=cancelled só limpa a URL (o usuário desistiu no meio do pagamento).
  useEffect(() => {
    const status = searchParams.get('status');
    if (status === 'success') {
      const plan = searchParams.get('plan') as typeof PLANS[number]['id'] | null;
      const cycleParam = searchParams.get('cycle') as 'mensal' | 'anual' | null;
      if (plan) {
        subscribe(plan, cycleParam ?? 'mensal');
        setSelected(plan);
        setConfirmed(true);
      }
    }
    if (status) setSearchParams({}, { replace: true });
  }, [searchParams, setSearchParams, subscribe]);

  function priceFor(monthly: number) {
    const value = cycle === 'anual' ? monthly * (1 - ANNUAL_DISCOUNT) : monthly;
    return value.toFixed(2).replace('.', ',');
  }

  async function handleSubscribe() {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId: selected, cycle, familyId }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? 'Não foi possível iniciar o pagamento.');
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível iniciar o pagamento. Tente novamente.');
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-cream pb-8">
      <TopBar title="Planos" backTo="/app/perfil" />
      <div className="px-4">
        <div className="mx-auto flex w-fit gap-1 rounded-full bg-white p-1 shadow-[var(--shadow-card)]">
          <button
            onClick={() => setCycle('mensal')}
            className={`rounded-full px-4 py-2 text-sm font-bold ${cycle === 'mensal' ? 'bg-navy text-white' : 'text-navy/60'}`}
          >
            Mensal
          </button>
          <button
            onClick={() => setCycle('anual')}
            className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-bold ${cycle === 'anual' ? 'bg-navy text-white' : 'text-navy/60'}`}
          >
            Anual <span className="rounded-full bg-gold px-1.5 text-[10px] text-white">-20%</span>
          </button>
        </div>

        <div className="mt-5 flex flex-col gap-4">
          {PLANS.map((plan) => (
            <button key={plan.id} onClick={() => setSelected(plan.id)} className="text-left">
              <div
                className={`rounded-[var(--radius-card)] border-2 p-5 ${
                  selected === plan.id ? 'border-orange bg-orange-light/10' : 'border-navy/10 bg-white'
                } ${plan.highlight ? 'relative' : ''}`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-5 rounded-full bg-orange px-3 py-1 text-xs font-bold text-white">Mais popular</span>
                )}
                <div className="flex items-center justify-between">
                  <p className="font-display text-lg font-extrabold text-navy">{plan.name}</p>
                  {currentPlan === plan.id && <span className="text-xs font-bold text-green-dark">Ativo</span>}
                </div>
                <p className="font-display text-2xl font-extrabold text-navy">
                  R$ {priceFor(plan.monthlyPrice)}
                  <span className="text-sm font-semibold text-navy/50">/mês</span>
                </p>
                <ul className="mt-2 flex flex-col gap-1">
                  {plan.features.map((f) => (
                    <li key={f} className="text-sm text-navy/70">
                      • {f}
                    </li>
                  ))}
                </ul>
              </div>
            </button>
          ))}
        </div>

        <Button full size="lg" className="mt-6" onClick={handleSubscribe} disabled={loading}>
          {loading ? 'Abrindo pagamento...' : 'Assinar com cartão'}
        </Button>

        {/* PIX é como o pai brasileiro paga: cai na hora e sem taxa de cartão. */}
        <button
          onClick={() => setPixAberto(true)}
          className="mt-3 w-full rounded-pill border-2 border-navy/15 bg-white py-3.5 font-display text-base font-bold text-navy active:translate-y-[2px]"
        >
          Pagar com PIX
        </button>

        {error && <p className="mt-3 text-center text-sm font-semibold text-red-soft">{error}</p>}
        <p className="mt-3 text-center text-xs text-navy/40">
          Cartão via Stripe · PIX via PagBank. Pagamento seguro.
        </p>
      </div>

      <CheckoutPix
        aberto={pixAberto}
        planId={selected}
        planNome={PLANS.find((p) => p.id === selected)?.name ?? ''}
        cycle={cycle}
        valorFormatado={priceFor(PLANS.find((p) => p.id === selected)?.monthlyPrice ?? 0)}
        emailPadrao={emailDaConta}
        familyId={familyId}
        onFechar={() => setPixAberto(false)}
      />

      <Modal open={confirmed} onClose={() => setConfirmed(false)}>
        <div className="flex flex-col items-center gap-3 text-center">
          <MascotOficial size={100} />
          <h2 className="font-display text-xl font-extrabold text-navy">Assinatura confirmada!</h2>
          <p className="text-navy/70">
            Plano {PLANS.find((p) => p.id === selected)?.name} ({cycle}) ativado com sucesso.
          </p>
          <Button
            full
            onClick={() => {
              setConfirmed(false);
              navigate('/app/perfil');
            }}
          >
            Continuar
          </Button>
        </div>
      </Modal>
    </div>
  );
}


