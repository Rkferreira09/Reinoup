import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../../components/ui/TopBar';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Mascot } from '../../components/mascot/Mascot';
import { PLANS, ANNUAL_DISCOUNT } from '../../content/plans';
import { useSettingsStore } from '../../store/settingsStore';

export function Plans() {
  const navigate = useNavigate();
  const currentPlan = useSettingsStore((s) => s.plan);
  const subscribe = useSettingsStore((s) => s.subscribe);
  const [cycle, setCycle] = useState<'mensal' | 'anual'>('mensal');
  const [selected, setSelected] = useState<typeof PLANS[number]['id']>('completo');
  const [confirmed, setConfirmed] = useState(false);

  function priceFor(monthly: number) {
    const value = cycle === 'anual' ? monthly * (1 - ANNUAL_DISCOUNT) : monthly;
    return value.toFixed(2).replace('.', ',');
  }

  function handleSubscribe() {
    subscribe(selected, cycle);
    setConfirmed(true);
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

        <Button full size="lg" className="mt-6" onClick={handleSubscribe}>
          Assinar agora
        </Button>
        <p className="mt-3 text-center text-xs text-navy/40">
          Demonstração: nenhuma cobrança real é feita neste protótipo.
        </p>
      </div>

      <Modal open={confirmed} onClose={() => setConfirmed(false)}>
        <div className="flex flex-col items-center gap-3 text-center">
          <Mascot pose="comemorando" size={100} />
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
