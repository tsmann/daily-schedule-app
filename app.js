const { useState, useEffect } = React;
const { createElement: h } = React;

// Icon components
const Clock = ({ className }) => h('svg', { className, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', strokeWidth: 2 }, [
  h('circle', { key: 1, cx: '12', cy: '12', r: '10' }),
  h('polyline', { key: 2, points: '12,6 12,12 16,14' })
]);

const Check = ({ className }) => h('svg', { className, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', strokeWidth: 2 },
  h('polyline', { points: '20,6 9,17 4,12' })
);

const CheckCircle = ({ className }) => h('svg', { className, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', strokeWidth: 2 }, [
  h('path', { key: 1, d: 'M22 11.08V12a10 10 0 1 1-5.93-9.14' }),
  h('polyline', { key: 2, points: '22,4 12,14.01 9,11.01' })
]);

const Home = ({ className }) => h('svg', { className, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', strokeWidth: 2 }, [
  h('path', { key: 1, d: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' }),
  h('polyline', { key: 2, points: '9,22 9,12 15,12 15,22' })
]);

const Star = ({ className }) => h('svg', { className, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', strokeWidth: 2 },
  h('polygon', { points: '12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2' })
);

const Calendar = ({ className }) => h('svg', { className, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', strokeWidth: 2 }, [
  h('rect', { key: 1, x: '3', y: '4', width: '18', height: '18', rx: '2', ry: '2' }),
  h('line', { key: 2, x1: '16', y1: '2', x2: '16', y2: '6' }),
  h('line', { key: 3, x1: '8', y1: '2', x2: '8', y2: '6' }),
  h('line', { key: 4, x1: '3', y1: '10', x2: '21', y2: '10' })
]);

const Plus = ({ className }) => h('svg', { className, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', strokeWidth: 2 }, [
  h('line', { key: 1, x1: '12', y1: '5', x2: '12', y2: '19' }),
  h('line', { key: 2, x1: '5', y1: '12', x2: '19', y2: '12' })
]);

const X = ({ className }) => h('svg', { className, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', strokeWidth: 2 }, [
  h('line', { key: 1, x1: '18', y1: '6', x2: '6', y2: '18' }),
  h('line', { key: 2, x1: '6', y1: '6', x2: '18', y2: '18' })
]);

const RotateCcw = ({ className }) => h('svg', { className, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', strokeWidth: 2 }, [
  h('polyline', { key: 1, points: '1,4 1,10 7,10' }),
  h('path', { key: 2, d: 'M3.51 15a9 9 0 1 0 2.13-9.36L1 10' })
]);

const DailyScheduleApp = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [completedTasks, setCompletedTasks] = useState(new Set());
  const [currentWeek, setCurrentWeek] = useState(1);
  const [customTasks, setCustomTasks] = useState({});
  const [showAddTask, setShowAddTask] = useState(null);
  const [newTaskText, setNewTaskText] = useState('');

  const flyLadyZones = {
    1: { name: "Entrance, Front Porch & Dining Room", color: "bg-blue-100 text-blue-800" },
    2: { name: "Kitchen", color: "bg-green-100 text-green-800" },
    3: { name: "Bathroom & Kids' Rooms", color: "bg-purple-100 text-purple-800" },
    4: { name: "Master Bedroom", color: "bg-pink-100 text-pink-800" }
  };

  const schedule = [
    { id: 1, time: "6:45-7:00 AM", title: "Wake Up & Coffee", tasks: ["Quick coffee while mentally reviewing day", "Check on grandma (usually still sleeping)"], type: "personal" },
    { id: 2, time: "7:00-8:00 AM", title: "Child Morning Routine", tasks: ["Make/pack child's lunch", "Prepare child's breakfast", "Get child ready for school"], type: "childcare" },
    { id: 3, time: "8:00-8:30 AM", title: "Grandma Care & Child Departure", tasks: ["Change grandma's diaper", "Put grandma back to bed", "See child off to school at 8:30"], type: "care" },
    { id: 4, time: "8:30-9:30 AM", title: "Your Power Hour", tasks: ["Make your breakfast", "Do dishes from morning/night before", "Quick straightening of main areas", "Priority work tasks (emails, urgent items)", "Prep lunch ingredients for later"], type: "personal", highlight: true },
    { id: 5, time: "9:30-10:00 AM", title: "Grandma Wakes - Attention Block", tasks: ["Full attention time with grandma", "Get her settled in main room", "Give her textured item or photo album", "Set up where you can see her profile"], type: "care" },
    { id: 6, time: "10:00-11:30 AM", title: "Work Block 1", tasks: ["Position yourself visible to grandma but facing away", "Set 15-minute timer for proactive check-ins", "Focus on work that can be interrupted", "Use phrase: 'Almost done, then I'll come sit with you'"], type: "work" },
    { id: 7, time: "11:30 AM-12:00 PM", title: "Attention Block & Movement", tasks: ["Full attention time with grandma", "Light FlyLady zone cleaning in same room", "Bodyweight exercises if grandma is calm"], type: "flylady" },
    { id: 8, time: "12:00-1:00 PM", title: "Lunch & Possible Nap Time", tasks: ["Your lunch", "More intensive work if she's sleeping", "Dinner prep (chop vegetables, marinate proteins)", "If no nap: light tasks while maintaining visual contact"], type: "personal" },
    { id: 9, time: "1:00-2:30 PM", title: "Work Block 2", tasks: ["Same positioning strategy as morning", "15-minute check-in timer", "FlyLady zone work in visible areas"], type: "work" },
    { id: 10, time: "2:30-3:00 PM", title: "Attention Block & Exercise", tasks: ["Quality time with grandma", "Quick exercise routine", "Snack prep"], type: "personal" },
    { id: 11, time: "3:00-3:45 PM", title: "Pre-Sundowning Prep", tasks: ["Increase lighting", "Put on familiar music", "Move dinner items to counter", "Position cooking materials for easy access"], type: "prep" },
    { id: 12, time: "3:45-6:00 PM", title: "Sundowning Management & Dinner", tasks: ["Stay highly visible to grandma", "Cook dinner using pre-prepped ingredients", "Frequent reassurance and check-ins", "Serve dinner around 4:30-5:00", "Clean as you go"], type: "care", warning: true },
    { id: 13, time: "6:00+ PM", title: "Evening Wind-Down", tasks: ["Child homework/activities", "Minimal work - only if urgent", "Family time", "Prepare for next day", "Grandma bedtime routine"], type: "family" }
  ];

  const flyLadyPrinciples = [
    "You are not behind! Jump in where you are!",
    "You can do anything for 15 minutes",
    "Your house did not get messy in a day, it won't get clean in a day",
    "Progress, not perfection",
    "Routines will set you free"
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('completedTasks');
      if (saved) setCompletedTasks(new Set(JSON.parse(saved)));
      const savedCustom = localStorage.getItem('customTasks');
      if (savedCustom) setCustomTasks(JSON.parse(savedCustom));
      const savedWeek = localStorage.getItem('currentWeek');
      if (savedWeek) setCurrentWeek(parseInt(savedWeek));
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('completedTasks', JSON.stringify(Array.from(completedTasks)));
    } catch (e) {}
  }, [completedTasks]);

  useEffect(() => {
    try {
      localStorage.setItem('customTasks', JSON.stringify(customTasks));
    } catch (e) {}
  }, [customTasks]);

  useEffect(() => {
    try {
      localStorage.setItem('currentWeek', currentWeek.toString());
    } catch (e) {}
  }, [currentWeek]);

  const addCustomTask = (scheduleId) => {
    if (newTaskText.trim()) {
      const updated = { ...customTasks };
      if (!updated[scheduleId]) updated[scheduleId] = [];
      updated[scheduleId].push(newTaskText.trim());
      setCustomTasks(updated);
      setNewTaskText('');
      setShowAddTask(null);
    }
  };

  const removeCustomTask = (scheduleId, taskIndex) => {
    const updated = { ...customTasks };
    updated[scheduleId].splice(taskIndex, 1);
    if (updated[scheduleId].length === 0) delete updated[scheduleId];
    setCustomTasks(updated);
    const taskKey = `${scheduleId}-custom-${taskIndex}`;
    const newCompleted = new Set(completedTasks);
    newCompleted.delete(taskKey);
    setCompletedTasks(newCompleted);
  };

  const resetDailyTasks = () => {
    if (window.confirm('Reset all completed tasks for today?')) {
      setCompletedTasks(new Set());
    }
  };

  const getCurrentTimeBlock = () => {
    const mins = currentTime.getHours() * 60 + currentTime.getMinutes();
    if (mins >= 405 && mins < 420) return 1;
    if (mins >= 420 && mins < 480) return 2;
    if (mins >= 480 && mins < 510) return 3;
    if (mins >= 510 && mins < 570) return 4;
    if (mins >= 570 && mins < 600) return 5;
    if (mins >= 600 && mins < 690) return 6;
    if (mins >= 690 && mins < 720) return 7;
    if (mins >= 720 && mins < 780) return 8;
    if (mins >= 780 && mins < 870) return 9;
    if (mins >= 870 && mins < 900) return 10;
    if (mins >= 900 && mins < 945) return 11;
    if (mins >= 945 && mins < 1080) return 12;
    if (mins >= 1080) return 13;
    return null;
  };

  const toggleTask = (scheduleId, taskIndex) => {
    const taskKey = `${scheduleId}-${taskIndex}`;
    const newCompleted = new Set(completedTasks);
    if (completedTasks.has(taskKey)) {
      newCompleted.delete(taskKey);
    } else {
      newCompleted.add(taskKey);
    }
    setCompletedTasks(newCompleted);
  };

  const getTypeColor = (type) => {
    const colors = {
      personal: 'border-l-blue-500 bg-blue-50',
      childcare: 'border-l-green-500 bg-green-50',
      care: 'border-l-purple-500 bg-purple-50',
      work: 'border-l-orange-500 bg-orange-50',
      flylady: 'border-l-pink-500 bg-pink-50',
      prep: 'border-l-yellow-500 bg-yellow-50',
      family: 'border-l-indigo-500 bg-indigo-50'
    };
    return colors[type] || 'border-l-gray-500 bg-gray-50';
  };

  const currentBlock = getCurrentTimeBlock();

  return h('div', { className: "max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen" }, [
    h('div', { key: 'header', className: "bg-white rounded-lg shadow-lg p-6 mb-6" }, [
      h('div', { key: 'title-row', className: "flex items-center justify-between mb-4" }, [
        h('h1', { key: 'title', className: "text-3xl font-bold text-gray-800 flex items-center gap-2" }, [
          h(Calendar, { key: 'icon', className: "text-blue-600 w-8 h-8" }),
          "Daily Schedule"
        ]),
        h('div', { key: 'controls', className: "flex items-center gap-3" }, [
          h('button', {
            key: 'reset',
            onClick: resetDailyTasks,
            className: "flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
          }, [
            h(RotateCcw, { key: 'icon', className: "w-4 h-4" }),
            "Reset"
          ]),
          h('div', { key: 'time', className: "text-right" }, [
            h('div', { key: 'time-val', className: "text-2xl font-bold text-blue-600" }, currentTime.toLocaleTimeString()),
            h('div', { key: 'date-val', className: "text-gray-600" }, currentTime.toLocaleDateString())
          ])
        ])
      ]),
      h('div', { key: 'zone-section', className: "mb-6" }, [
        h('div', { key: 'zone-header', className: "flex items-center justify-between mb-3" }, [
          h('h2', { key: 'zone-title', className: "text-xl font-semibold flex items-center gap-2" }, [
            h(Home, { key: 'icon', className: "text-pink-600 w-5 h-5" }),
            "FlyLady Zone This Week"
          ]),
          h('div', { key: 'week-btns', className: "flex gap-2" }, [1, 2, 3, 4].map(week =>
            h('button', {
              key: week,
              onClick: () => setCurrentWeek(week),
              className: `px-3 py-1 rounded-full text-sm font-medium ${currentWeek === week ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-700'}`
            }, `Week ${week}`)
          ))
        ]),
        h('div', { key: 'zone-display', className: `p-4 rounded-lg ${flyLadyZones[currentWeek].color}` }, [
          h('div', { key: 'zone-name', className: "font-semibold text-lg" }, `Zone ${currentWeek}: ${flyLadyZones[currentWeek].name}`),
          h('div', { key: 'zone-desc', className: "text-sm mt-1" }, "Focus 15 minutes daily on this zone")
        ])
      ]),
      h('div', { key: 'principles', className: "bg-pink-50 p-4 rounded-lg border border-pink-200" }, [
        h('h3', { key: 'p-title', className: "font-semibold text-pink-800 mb-2 flex items-center gap-2" }, [
          h(Star, { key: 'icon', className: "w-4 h-4" }),
          "FlyLady Reminders"
        ]),
        h('div', { key: 'p-grid', className: "grid grid-cols-1 md:grid-cols-2 gap-2" }, flyLadyPrinciples.map((p, i) =>
          h('div', { key: i, className: "text-sm text-pink-700 italic" }, `"• ${p}"`)
        ))
      ])
    ]),
    h('div', { key: 'schedule', className: "space-y-4" }, schedule.map(block => {
      const isActive = currentBlock === block.id;
      const blockCompleted = block.tasks.every((_, i) => completedTasks.has(`${block.id}-${i}`));
      return h('div', {
        key: block.id,
        className: `bg-white rounded-lg shadow-md border-l-4 ${getTypeColor(block.type)} ${isActive ? 'ring-2 ring-blue-400' : ''} ${block.warning ? 'border-red-300 bg-red-50' : ''}`
      }, h('div', { className: "p-4" }, [
        h('div', { key: 'header', className: "flex items-center justify-between mb-3" }, [
          h('div', { key: 'info', className: "flex items-center gap-3" }, [
            h(Clock, { key: 'icon', className: `w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}` }),
            h('div', { key: 'text' }, [
              h('h3', { key: 'title', className: "font-semibold text-lg text-gray-800" }, block.title),
              h('p', { key: 'time', className: "text-sm text-gray-600" }, block.time)
            ])
          ]),
          h('div', { key: 'status', className: "flex items-center gap-2" }, [
            isActive && h('span', { key: 'badge', className: "px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full" }, "Current"),
            blockCompleted && h(CheckCircle, { key: 'check', className: "w-6 h-6 text-green-600" })
          ])
        ]),
        h('div', { key: 'tasks', className: "space-y-2" }, [
          ...block.tasks.map((task, i) => {
            const key = `${block.id}-${i}`;
            const done = completedTasks.has(key);
            return h('div', { key: i, className: "flex items-center gap-3 p-2 rounded hover:bg-gray-50" }, [
              h('button', {
                key: 'check',
                onClick: () => toggleTask(block.id, i),
                className: `w-5 h-5 rounded border-2 flex items-center justify-center ${done ? 'bg-green-600 border-green-600' : 'border-gray-300'}`
              }, done && h(Check, { className: "w-3 h-3 text-white" })),
              h('span', { key: 'text', className: done ? 'line-through text-gray-500' : 'text-gray-700' }, task)
            ]);
          }),
          ...(customTasks[block.id] || []).map((task, i) => {
            const key = `${block.id}-custom-${i}`;
            const done = completedTasks.has(key);
            return h('div', { key: `c-${i}`, className: "flex items-center gap-3 p-2 rounded hover:bg-gray-50" }, [
              h('button', {
                key: 'check',
                onClick: () => toggleTask(block.id, `custom-${i}`),
                className: `w-5 h-5 rounded border-2 flex items-center justify-center ${done ? 'bg-green-600 border-green-600' : 'border-gray-300'}`
              }, done && h(Check, { className: "w-3 h-3 text-white" })),
              h('span', { key: 'text', className: `flex-1 ${done ? 'line-through text-gray-500' : 'text-gray-700'}` }, task),
              h('button', {
                key: 'remove',
                onClick: () => removeCustomTask(block.id, i),
                className: "w-4 h-4 text-gray-400 hover:text-red-600"
              }, h(X, { className: "w-4 h-4" }))
            ]);
          }),
          showAddTask === block.id
            ? h('div', { key: 'add-form', className: "flex items-center gap-2 p-2" }, [
                h('input', {
                  key: 'input',
                  type: "text",
                  value: newTaskText,
                  onChange: (e) => setNewTaskText(e.target.value),
                  placeholder: "Add custom task...",
                  className: "flex-1 px-3 py-1 border border-gray-300 rounded text-sm",
                  onKeyPress: (e) => e.key === 'Enter' && addCustomTask(block.id)
                }),
                h('button', {
                  key: 'add',
                  onClick: () => addCustomTask(block.id),
                  className: "px-3 py-1 bg-blue-600 text-white rounded text-sm"
                }, "Add"),
                h('button', {
                  key: 'cancel',
                  onClick: () => { setShowAddTask(null); setNewTaskText(''); },
                  className: "px-2 py-1 text-gray-600"
                }, "Cancel")
              ])
            : h('button', {
                key: 'add-btn',
                onClick: () => setShowAddTask(block.id),
                className: "flex items-center gap-2 p-2 w-full text-left text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
              }, [
                h(Plus, { key: 'icon', className: "w-4 h-4" }),
                h('span', { key: 'text', className: "text-sm" }, "Add custom task")
              ])
        ]),
        block.type === 'flylady' && h('div', { key: 'fly-note', className: "mt-3 p-2 bg-pink-50 rounded text-sm text-pink-700" }, `💡 Focus on Zone ${currentWeek}: ${flyLadyZones[currentWeek].name}`),
        block.warning && h('div', { key: 'warning', className: "mt-3 p-2 bg-red-100 rounded text-sm text-red-700" }, "⚠️ Challenging time - Focus on presence for grandma")
      ]));
    }))
  ]);
};

ReactDOM.render(h(DailyScheduleApp), document.getElementById('root'));
