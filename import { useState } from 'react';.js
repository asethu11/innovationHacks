import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, GripVertical, Calendar, ClipboardList, Clock, ArrowRight, Video, Bell, ChevronDown, ChevronRight, Camera, Menu, Upload, Home, Users, BarChart2, Folder, Settings, LogOut } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialData = [
  { id: 'todo', title: 'To Do', tasks: ['Task A', 'Task B'] },
  { id: 'inprogress', title: 'In Progress', tasks: ['Task C'] },
  { id: 'done', title: 'Done', tasks: ['Task D'] },
];

const meetingsData = [
  {
    title: 'Sprint Planning',
    date: 'Apr 22',
    time: '10:00am - 11:00am',
    attendees: 'Jake B, Adam K, Amy D, Jacob D',
    url: 'https://sau.zoom.us/meeting/register/Le6y...',
    agenda: 'Review Q2 goals, Assign sprint tasks, Discuss blockers'
  },
  {
    title: 'Sprint Planning',
    date: 'Apr 22',
    time: '10:00am - 11:00am',
    attendees: 'Jake B, Adam K, Amy D, Jacob D',
    url: 'https://sau.zoom.us/meeting/register/Le6y...',
    agenda: 'Review dashboard wireframes, Discuss user feedback, Finalize design decision'
  }
];

function NavItem({ icon, label }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-black">
      {icon}<span>{label}</span>
    </div>
  );
}

function SummaryCard({ icon, label, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
      <div className="p-2 bg-gray-100 rounded-full">{icon}</div>
      <div>
        <div className="text-xs text-gray-500 uppercase tracking-wide">{label}</div>
        <div className="text-lg font-semibold">{value}</div>
      </div>
    </div>
  );
}

export default function KanbanBoard() {
  const [columns, setColumns] = useState(initialData);

  const addTask = (colId) => {
    const taskTitle = prompt('New task name');
    if (!taskTitle) return;
    setColumns(columns.map(col =>
      col.id === colId ? { ...col, tasks: [...col.tasks, taskTitle] } : col
    ));
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColIndex = columns.findIndex(col => col.id === source.droppableId);
    const destColIndex = columns.findIndex(col => col.id === destination.droppableId);
    const sourceCol = columns[sourceColIndex];
    const destCol = columns[destColIndex];

    const sourceTasks = [...sourceCol.tasks];
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceTasks.splice(destination.index, 0, movedTask);
      const newColumns = [...columns];
      newColumns[sourceColIndex].tasks = sourceTasks;
      setColumns(newColumns);
    } else {
      const destTasks = [...destCol.tasks];
      destTasks.splice(destination.index, 0, movedTask);
      const newColumns = [...columns];
      newColumns[sourceColIndex].tasks = sourceTasks;
      newColumns[destColIndex].tasks = destTasks;
      setColumns(newColumns);
    }
  };

  return (
    <div className="flex">
      <aside className="w-64 min-h-screen bg-white border-r shadow-md p-4 space-y-6">
        <div className="flex justify-between items-center">
          <Menu className="w-5 h-5" />
          <div className="w-2/3 h-4 bg-gray-200 rounded" />
        </div>
        <div className="flex justify-between items-center">
          <Button className="w-full flex gap-2 items-center text-white bg-black"><Plus className="w-4 h-4" />New Meeting</Button>
          <Upload className="w-4 h-4 ml-2 text-gray-500" />
        </div>

        <div className="text-xs text-gray-500 font-semibold uppercase">Workflow</div>
        <nav className="space-y-2">
          <NavItem icon={<Home />} label="Dashboard" />
          <NavItem icon={<Calendar />} label="Meetings" />
          <NavItem icon={<ClipboardList />} label="Tasks" />
        </nav>

        <div className="text-xs text-gray-500 font-semibold uppercase">Management</div>
        <nav className="space-y-2">
          <NavItem icon={<Users />} label="Teams" />
          <NavItem icon={<BarChart2 />} label="Analytics" />
        </nav>

        <div className="text-xs text-gray-500 font-semibold uppercase">Projects</div>
        <nav className="space-y-2">
          <NavItem icon={<Folder />} label="Product 1 Lorem" />
          <NavItem icon={<Folder />} label="Lorem Ipsum Project" />
          <NavItem icon={<Folder />} label="Lorem Dores Project" />
          <NavItem icon={<Folder />} label="UX Sprint Planning" />
          <NavItem icon={<Folder />} label="Product Demo" />
        </nav>

        <div className="pt-6 border-t space-y-2">
          <NavItem icon={<Settings />} label="Settings" />
          <NavItem icon={<LogOut />} label="Log Out" />
        </div>
      </aside>

      <main className="flex-1 bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Hi, John <ChevronDown className="inline w-4 h-4" /></h1>
            <Bell className="w-5 h-5 text-gray-500" />
          </div>
          <div className="flex items-center gap-2">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg flex items-center gap-2">
              <Camera className="w-4 h-4" /> Meeting Live <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <SummaryCard icon={<Calendar />} label="Meetings Today" value="4" />
          <SummaryCard icon={<ClipboardList />} label="Tasks in Progress" value="14" />
          <SummaryCard icon={<ArrowRight />} label="Follow-Up Needed" value="14" />
          <SummaryCard icon={<Clock />} label="Hours in Meetings" value="14h 32m" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {columns.map(column => (
                  <Card key={column.id} className="bg-white rounded-2xl shadow-md">
                    <div className="flex items-center justify-between px-4 py-3 border-b">
                      <h2 className="text-lg font-semibold">{column.title}</h2>
                      <Button variant="ghost" size="sm" onClick={() => addTask(column.id)}>
                        <Plus className="w-4 h-4 mr-1" />
                      </Button>
                    </div>
                    <Droppable droppableId={column.id}>
                      {(provided) => (
                        <CardContent
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="space-y-3 p-4 min-h-[100px]">
                          {column.tasks.map((task, idx) => (
                            <Draggable key={task} draggableId={task} index={idx}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="flex items-center justify-between bg-gray-100 rounded-xl px-3 py-2 shadow-sm">
                                  <span>{task}</span>
                                  <GripVertical className="w-4 h-4 text-gray-400" />
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </CardContent>
                      )}
                    </Droppable>
                  </Card>
                ))}
              </div>
            </DragDropContext>
          </div>

          <div className="md:col-span-1 space-y-4">
            <Card className="bg-white rounded-2xl shadow-md">
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <h2 className="text-lg font-semibold">Meetings</h2>
                <Button variant="ghost" size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                </Button>
              </div>
              <CardContent className="space-y-4 p-4">
                {meetingsData.map((meeting, idx) => (
                  <div key={idx} className="border p-3 rounded-xl shadow-sm">
                    <div className="text-sm font-semibold mb-1">{meeting.title}</div>
                    <div className="text-xs text-gray-500">{meeting.date} • {meeting.time}</div>
                    <div className="text-xs text-gray-500 mb-1">{meeting.attendees}</div>
                    <div className="text-xs mb-2 text-gray-600 italic">{meeting.agenda}</div>
                    <a href={meeting.url} className="inline-flex items-center px-3 py-1 rounded-md bg-black text-white text-xs">
                      <Video className="w-3 h-3 mr-1" /> Start Meeting
                    </a>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
