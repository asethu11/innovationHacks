import { useState, useEffect } from 'react';
import { ChevronLeft, Search, AlertTriangle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const agendaItems = [
  { title: 'Review Q1 Metrics', status: 'done' },
  { title: 'Discuss New Features', status: 'in-progress' },
  { title: 'Team Capacity Planning', status: 'upcoming' },
];

const transcript = [
  { time: '04:40', speaker: 'Jake', text: 'Let’s dive into the metrics...' },
  { time: '04:41', speaker: 'Amy', text: 'Hmm, we’ll see how that works out.' },
  { time: '04:42', speaker: 'Adam', text: 'Can we make a ticket for this?' }
];

const tasks = [
  {
    title: 'Prepare Q1 Report Slide',
    assignee: 'Amy',
    due: 'Apr 30',
    status: 'Pending',
    suggestions: ['Break task into subtasks?', 'Assignee overloaded?']
  }
];

export default function MeetingLive() {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      {/* 🔴 Top Banner */}
      <div className="bg-white p-3 flex justify-between items-center rounded-xl shadow-sm border">
        <div className="flex items-center gap-3 text-sm">
          <span className="text-red-500 font-semibold">🔴 LIVE</span>
          <span className="text-green-600">😊 Engaged</span>
        </div>
        <div className="text-sm flex items-center gap-2">
          <Clock className="w-4 h-4" /> {formatTime(timer)}
        </div>
      </div>

      {/* ⚠️ Topic Drift */}
      <div className="mt-2 text-sm text-yellow-700 bg-yellow-100 px-3 py-2 rounded-lg flex items-center gap-2">
        <AlertTriangle className="w-4 h-4" /> ⚠️ Topic drift detected: 3+ minutes off agenda
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-6">
        {/* 💬 Transcript */}
        <div className="lg:col-span-1 bg-white rounded-xl p-4 shadow-sm border h-[70vh] flex flex-col">
          <div className="mb-2 flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Search transcript..." className="w-full px-2 py-1 text-sm border rounded-md" />
          </div>
          <div className="overflow-y-auto space-y-2 text-sm flex-1">
            {transcript.map((entry, i) => (
              <div key={i} className="border-b pb-1">
                <span className="font-medium mr-1">[{entry.time}] {entry.speaker}:</span>
                <span className={/we'll see|maybe|someday/i.test(entry.text) ? 'text-yellow-700 font-semibold' : ''}>{entry.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Agenda + Tasks */}
        <div className="lg:col-span-2 space-y-4">
          {/* Agenda Progress */}
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <h2 className="text-md font-semibold mb-3">Agenda Progress</h2>
            <ul className="space-y-2 text-sm">
              {agendaItems.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  {item.status === 'done' && '✅'}
                  {item.status === 'in-progress' && '⏳'}
                  {item.status === 'upcoming' && '➡️'}
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div className="h-2 rounded-full bg-blue-500" style={{ width: '33%' }}></div>
            </div>
            <div className="text-sm text-yellow-600 mt-2">🔁 Nudging back to agenda...</div>
          </div>

          {/* AI Assistant Panel */}
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <h2 className="text-md font-semibold mb-3">🤖 AI Assistant</h2>
            {tasks.map((task, i) => (
              <div key={i} className="border rounded-lg p-3 mb-3">
                <div className="text-sm font-medium">{task.title}</div>
                <div className="text-xs text-gray-500">{task.assignee} • Due {task.due} • {task.status}</div>
                <div className="mt-2 flex gap-2">
                  <Button size="sm" variant="outline">✅ Approve</Button>
                  <Button size="sm" variant="outline">✏️ Edit</Button>
                  <Button size="sm" variant="outline">🗑️ Delete</Button>
                </div>
                {task.suggestions && task.suggestions.length > 0 && (
                  <div className="mt-2 space-y-1 text-xs text-gray-600">
                    {task.suggestions.map((s, j) => (
                      <div key={j} className="flex justify-between items-center">
                        <span>{s}</span>
                        <div className="space-x-1">
                          <Button size="sm" variant="outline">Accept</Button>
                          <Button size="sm" variant="ghost">Dismiss</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 🕒 Action Timeline */}
        <div className="lg:col-span-1 bg-white p-4 rounded-xl shadow-sm border h-[70vh] overflow-y-auto">
          <h2 className="text-md font-semibold mb-3">🕒 AI Action Timeline</h2>
          <ul className="text-sm space-y-1">
            <li>04:41 – Drift detected</li>
            <li>04:42 – Task generated</li>
            <li>04:43 – Sentiment flagged</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
