import { useEffect, useState } from 'react';
import { TopBar } from '../../components/ui/TopBar';
import { Card } from '../../components/ui/Card';
import { useAuthStore } from '../../store/authStore';
import { useProgressStore } from '../../store/progressStore';
import { useFriendsStore, MOCK_FRIENDS } from '../../store/friendsStore';

const REACTIONS = ['👍', '❤️', '🎉'];

export function Ranking() {
  const childProfile = useAuthStore((s) => s.childProfile);
  const weeklyXp = useProgressStore((s) => s.weeklyXp);
  const friends = useFriendsStore();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    friends.ensureCurrentWeek();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const entries = [
    { id: 'me', name: childProfile?.name ?? 'Você', xp: weeklyXp.xp, isMe: true, emoji: '🐑' },
    ...MOCK_FRIENDS.map((f) => ({ id: f.id, name: f.name, xp: friends.weeklyXp[f.id] ?? 0, isMe: false, emoji: f.avatarEmoji })),
  ].sort((a, b) => b.xp - a.xp);

  function copyCode() {
    navigator.clipboard?.writeText(friends.classCode).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex min-h-screen flex-col bg-cream pb-8">
      <TopBar title="Ranking da Semana" backTo="/app/perfil" />
      <div className="flex flex-col gap-3 px-4">
        <p className="text-center text-sm text-navy/60">Ranking reinicia toda segunda-feira. Vale o esforço da semana!</p>

        {entries.map((e, i) => (
          <Card key={e.id} className={`flex items-center gap-3 ${e.isMe ? 'border-2 border-orange' : ''}`}>
            <span className="w-6 text-center font-display font-extrabold text-navy/50">{i + 1}</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy/5 text-xl">{e.emoji}</span>
            <p className="flex-1 font-display font-bold text-navy">{e.name}</p>
            <p className="font-display font-extrabold text-orange-dark">{e.xp} XP</p>
            {!e.isMe && (
              <button
                onClick={() => friends.sendReaction(e.id, REACTIONS[Math.floor(Math.random() * REACTIONS.length)])}
                className="text-lg"
                aria-label="Reagir"
              >
                {friends.reactions[e.id] ?? '👋'}
              </button>
            )}
          </Card>
        ))}

        <Card className="mt-2 text-center">
          <p className="font-display font-bold text-navy">Modo Turma</p>
          <p className="mt-1 text-sm text-navy/60">Compartilhe o código com sua turma da igreja para todos jogarem juntos.</p>
          <button onClick={copyCode} className="mt-3 rounded-xl bg-navy px-4 py-2 font-display font-bold text-white">
            {copied ? 'Copiado! ✓' : `Código: ${friends.classCode}`}
          </button>
        </Card>
      </div>
    </div>
  );
}
