const { useState, useEffect } = React;

// Lucide icons as simple SVG components
const Clock = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12,6 12,12 16,14"></polyline>
  </svg>
);

const Check = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="20,6 9,17 4,12"></polyline>
  </svg>
);

const CheckCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22,4 12,14.01 9,11.01"></polyline>
  </svg>
);

const Home = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9,22 9,12 15,12 15,22"></polyline>
  </svg>
);

const Star = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"></polygon>
  </svg>
);

const Calendar = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const Plus = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const X = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const RotateCcw = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="1,4 1,10 7,10"></polyline>
    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
  </svg>
);

const DailyScheduleApp = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [completedTasks, setCompletedTasks] = useState(new Set());
  const [currentWeek, setCurrentWeek] = useState(1);
  const [customTasks, setCustomTasks] = useState({});
  const [showAddTask, setShowAddTask] = useState(null);
  const [newTaskText, setNewTaskText] = useState('');

  // FlyLady Zones (4-week rotation)
  const flyLadyZones = {
    1: { name: "Entrance, Front Porch & Dining Room", color: "bg-blue-100 text-blue-800" },
    2: { name: "Kitchen", color: "bg-green-100 text-green-800" },
    3: { name: "Bathroom & Kids' Rooms", color: "bg-purple-100 text-purple-800" },
    4: { name: "Master Bedroom", color: "bg-pink-100 text-pink-800" }
  };

  // Daily Schedule
  const schedule = [
    {
      id: 1,
      time: "6:45-7:00 AM",
      title: "Wake Up & Coffee",
      tasks: [
        "Quick coffee while mentally reviewing day",
        "Check on grandma (usually still sleeping)"
      ],
      type: "personal"
    },
    {
      id: 2,
      time: "7:00-8:00 AM",
      title: "Child Morning Routine",
      tasks: [
        "Make/pack child's lunch",
        "Prepare child's breakfast",
        "Get child ready for school"
      ],
      type: "childcare"
    },
    {
      id: 3,
      time: "8:00-8:30 AM",
      title: "Grandma Care & Child Departure",
      tasks: [
        "Change grandma's diaper",
        "Put grandma back to bed",
        "See child off to school at 8:30"
      ],
      type: "care"
    },
    {
      id: 4,
      time: "8:30-9:30 AM",
      title: "Your Power Hour",
      tasks: [
        "Make your breakfast",
        "Do dishes from morning/night before",
        "Quick straightening of main areas",
        "Priority work tasks (emails, urgent items)",
        "Prep lunch ingredients for later"
      ],
      type: "personal",
      highlight: true
    },
    {
      id: 5,
      time: "9:30-10:00 AM",
      title: "Grandma Wakes - Attention Block",
      tasks: [
        "Full attention time with grandma",
        "Get her settled in main room",
        "Give her textured item or photo album",
        "Set up where you can see her profile"
      ],
      type: "care"
    },
    {
      id: 6,
      time: "10:00-11:30 AM",
      title: "Work Block 1",
      tasks: [
        "Position yourself visible to grandma but facing away",
        "Set 15-minute timer for proactive check-ins",
        "Focus on work that can be interrupted",
        "Use phrase: 'Almost done, then I'll come sit with you'"
      ],
      type: "work"
    },
    {
      id: 7,
      time: "11:30 AM-12:00 PM",
      title: "Attention Block & Movement",
      tasks: [
        "Full attention time with grandma",
        "Light FlyLady zone cleaning in same room",
        "Bodyweight exercises if grandma is calm"
      ],
      type: "flylady"
    },
    {
      id: 8,
      time: "12:00-1:00 PM",
      title: "Lunch & Possible Nap Time",
      tasks: [
        "Your lunch",
        "More intensive work if she's sleeping",
        "Dinner prep (chop vegetables, marinate proteins)",
        "If no nap: light tasks while maintaining visual contact"
      ],
      type: "personal"
    },
    {
      id: 9,
      time: "1:00-2:30 PM",
      title: "Work Block 2",
      tasks: [
        "Same positioning strategy as morning",
        "15-minute check-in timer",
        "FlyLady zone work in visible areas"
      ],
      type: "work"
    },
    {
      id: 10,
      time: "2:30-3:00 PM",
      title: "Attention Block & Exercise",
      tasks: [
        "Quality time with grandma",
        "Quick exercise routine",
        "Snack prep"
      ],
      type: "personal"
    },
    {
      id: 11,
      time: "3:00-3:45 PM",
      title: "Pre-Sundowning Prep",
      tasks: [
        "Increase lighting",
        "Put on familiar music",
        "Move dinner items to counter",
        "Position cooking materials for easy access"
      ],
      type: "prep"
    },
    {
      id: 12,
      time: "3:45-6:00 PM",
      title: "Sundowning Management & Dinner",
      tasks: [
        "Stay highly visible to grandma",
        "Cook dinner using pre-prepped ingredients",
        "Frequent reassurance and check-ins",
        "Serve dinner around 4:30-5:00",
        "Clean as you go"
      ],
      type: "care",
      warning: true
    },
    {
      id: 13,
      time: "6:00+ PM",
      title: "Evening Wind-Down",
      tasks: [
        "Child homework/activities",
        "Minimal work - only if urgent",
        "Family time",
        "Prepare for next day",
        "Grandma bedtime routine"
      ],
      type: "family"
    }
  ];

  // FlyLady Principles
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

  // Load saved data on component mount
  useEffect(() => {
    try {
      const savedCompleted = localStorage.getItem('completedTasks');
      const savedCustomTasks = localStorage.getItem('customTasks');
      const savedWeek = localStorage.getItem('currentWeek');
      
      if (savedCompleted) {
        setCompletedTasks(new Set(JSON.parse(savedCompleted)));
      }
      if (savedCustomTasks) {
        setCustomTasks(JSON.parse(savedCustomTasks));
      }
      if (savedWeek) {
        setCurrentWeek(parseInt(savedWeek));
      }
    } catch (e) {
      console.log('Error loading saved data:', e);
    }
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('completedTasks', JSON.stringify(Array.from(completedTasks)));
    } catch (e) {
      console.log('Error saving completed tasks:', e);
    }
  }, [completedTasks]);

  useEffect(() => {
    try {
      localStorage.setItem('customTasks', JSON.stringify(customTasks));
    } catch (e) {
      console.log('Error saving custom tasks:', e);
    }
  }, [customTasks]);

  useEffect(() => {
    try {
      localStorage.setItem('currentWeek', currentWeek.toString());
    } catch (e) {
      console.log('Error saving current week:', e);
    }
  }, [currentWeek]);

  const addCustomTask = (scheduleId) => {
    if (newTaskText.trim()) {
      const updatedCustomTasks = { ...customTasks };
      if (!updatedCustomTasks[scheduleId]) {
        updatedCustomTasks[scheduleId] = [];
      }
      updatedCustomTasks[scheduleId].push(newTaskText.trim());
      setCustomTasks(updatedCustomTasks);
      setNewTaskText('');
      setShowAddTask(null);
    }
  };

  const removeCustomTask = (scheduleId, taskIndex) => {
    const updatedCustomTasks = { ...customTasks };
    updatedCustomTasks[scheduleId].splice(taskIndex, 1);
    if (updatedCustomTasks[scheduleId].length === 0) {
      delete updatedCustomTasks[scheduleId];
    }
    setCustomTasks(updatedCustomTasks);
    
    // Also remove from completed tasks
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
    const now = currentTime;
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    const currentMinutes = currentHour * 60 + currentMinute;
    
    if (currentMinutes >= 405 && currentMinutes < 420) return 1;
    if (currentMinutes >= 420 && currentMinutes < 480) return 2;
    if (currentMinutes >= 480 && currentMinutes < 510) return 3;
    if (currentMinutes >= 510 && currentMinutes < 570) return 4;
    if (currentMinutes >= 570 && currentMinutes < 600) return 5;
    if (currentMinutes >= 600 && currentMinutes < 690) return 6;
    if (currentMinutes >= 690 && currentMinutes < 720) return 7;
    if (currentMinutes >= 720 && currentMinutes < 780) return 8;
    if (currentMinutes >= 780 && currentMinutes < 870) return 9;
    if (currentMinutes >= 870 && currentMinutes < 900) return 10;
    if (currentMinutes >= 900 && currentMinutes < 945) return 11;
    if (currentMinutes >= 945 && currentMinutes < 1080) return 12;
    if (currentMinutes >= 1080) return 13;
    
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
    switch (type) {
      case 'personal': return 'border-l-blue-500 bg-blue-50';
      case 'childcare': return 'border-l-green-500 bg-green-50';
      case 'care': return 'border-l-purple-500 bg-purple-50';
      case 'work': return 'border-l-orange-500 bg-orange-50';
      case 'flylady': return 'border-l-pink-500 bg-pink-50';
      case 'prep': return 'border-l-yellow-500 bg-yellow-50';
      case 'family': return 'border-l-indigo-500 bg-indigo-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const currentBlock = getCurrentTimeBlock();

  return React.createElement('div', {
    className: "max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen"
  }, [
    React.createElement('div', {
      key: 'header',
      className: "bg-white rounded-lg shadow-lg p-6 mb-6"
    }, [
      React.createElement('div', {
        key: 'title-section',
        className: "flex items-center justify-between mb-4"
      }, [
        React.createElement('h1', {
          key: 'title',
          className: "text-3xl font-bold text-gray-800 flex items-center gap-2"
        }, [
          React.createElement(Calendar, { key: 'calendar-icon', className: "text-blue-600" }),
          "Daily Schedule & Care Tracker"
        ]),
        React.createElement('div', {
          key: 'controls',
          className: "flex items-center gap-3"
        }, [
          React.createElement('button', {
            key: 'reset-btn',
            onClick: resetDailyTasks,
            className: "flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
          }, [
            React.createElement(RotateCcw, { key: 'reset-icon', className: "w-4 h-4" }),
            "Reset Day"
          ]),
          React.createElement('div', {
            key: 'time-display',
            className: "text-right"
          }, [
            React.createElement('div', {
              key: 'time',
              className: "text-2xl font-bold text-blue-600"
            }, currentTime.toLocaleTimeString()),
            React.createElement('div', {
              key: 'date',
              className: "text-gray-600"
            }, currentTime.toLocaleDateString())
          ])
        ])
      ]),
      
      // FlyLady Zone section
      React.createElement('div', {
        key: 'flylady-section',
        className: "mb-6"
      }, [
        React.createElement('div', {
          key: 'zone-header',
          className: "flex items-center justify-between mb-3"
        }, [
          React.createElement('h2', {
            key: 'zone-title',
            className: "text-xl font-semibold flex items-center gap-2"
          }, [
            React.createElement(Home, { key: 'home-icon', className: "text-pink-600" }),
            "FlyLady Zone This Week"
          ]),
          React.createElement('div', {
            key: 'week-buttons',
            className: "flex gap-2"
          }, [1, 2, 3, 4].map(week => 
            React.createElement('button', {
              key: week,
              onClick: () => setCurrentWeek(week),
              className: `px-3 py-1 rounded-full text-sm font-medium ${
                currentWeek === week 
                  ? 'bg-pink-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`
            }, `Week ${week}`)
          ))
        ]),
        
        React.createElement('div', {
          key: 'zone-display',
          className: `p-4 rounded-lg ${flyLadyZones[currentWeek].color}`
        }, [
          React.createElement('div', {
            key: 'zone-name',
            className: "font-semibold text-lg"
          }, `Zone ${currentWeek}: ${flyLadyZones[currentWeek].name}`),
          React.createElement('div', {
            key: 'zone-desc',
            className: "text-sm mt-1"
          }, "Focus 15 minutes daily on this zone during your cleaning blocks")
        ])
      ]),

      // FlyLady Principles
      React.createElement('div', {
        key: 'principles',
        className: "mb-6 bg-pink-50 p-4 rounded-lg border border-pink-200"
      }, [
        React.createElement('h3', {
          key: 'principles-title',
          className: "font-semibold text-pink-800 mb-2 flex items-center gap-2"
        }, [
          React.createElement(Star, { key: 'star-icon', className: "w-4 h-4" }),
          "FlyLady Reminders"
        ]),
        React.createElement('div', {
          key: 'principles-grid',
          className: "grid grid-cols-1 md:grid-cols-2 gap-2"
        }, flyLadyPrinciples.map((principle, index) =>
          React.createElement('div', {
            key: index,
            className: "text-sm text-pink-700 italic"
          }, `"• ${principle}"`)
        ))
      ])
    ]),

    // Schedule
    React.createElement('div', {
      key: 'schedule',
      className: "space-y-4"
    }, schedule.map((block) => {
      const isActive = currentBlock === block.id;
      const blockCompleted = block.tasks.every((_, index) => 
        completedTasks.has(`${block.id}-${index}`)
      );
      
      return React.createElement('div', {
        key: block.id,
        className: `bg-white rounded-lg shadow-md border-l-4 ${getTypeColor(block.type)} ${
          isActive ? 'ring-2 ring-blue-400 ring-opacity-75' : ''
        } ${block.highlight ? 'shadow-lg' : ''} ${
          block.warning ? 'border-red-300 bg-red-50' : ''
        }`
      }, React.createElement('div', {
        className: "p-4"
      }, [
        React.createElement('div', {
          key: 'block-header',
          className: "flex items-center justify-between mb-3"
        }, [
          React.createElement('div', {
            key: 'block-info',
            className: "flex items-center gap-3"
          }, [
            React.createElement(Clock, {
              key: 'clock-icon',
              className: `w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`
            }),
            React.createElement('div', { key: 'block-text' }, [
              React.createElement('h3', {
                key: 'block-title',
                className: "font-semibold text-lg text-gray-800"
              }, block.title),
              React.createElement('p', {
                key: 'block-time',
                className: "text-sm text-gray-600"
              }, block.time)
            ])
          ]),
          
          React.createElement('div', {
            key: 'block-status',
            className: "flex items-center gap-2"
          }, [
            isActive && React.createElement('span', {
              key: 'current-badge',
              className: "px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
            }, "Current"),
            blockCompleted && React.createElement(CheckCircle, {
              key: 'completed-icon',
              className: "w-6 h-6 text-green-600"
            })
          ])
        ]),

        React.createElement('div', {
          key: 'tasks-container',
          className: "space-y-2"
        }, [
          // Original tasks
          ...block.tasks.map((task, index) => {
            const taskKey = `${block.id}-${index}`;
            const isCompleted = completedTasks.has(taskKey);
            
            return React.createElement('div', {
              key: index,
              className: "flex items-center gap-3 p-2 rounded hover:bg-gray-50"
            }, [
              React.createElement('button', {
                key: 'task-checkbox',
                onClick: () => toggleTask(block.id, index),
                className: `w-5 h-5 rounded border-2 flex items-center justify-center ${
                  isCompleted
                    ? 'bg-green-600 border-green-600 text-white'
                    : 'border-gray-300 hover:border-gray-400'
                }`
              }, isCompleted && React.createElement(Check, { className: "w-3 h-3" })),
              React.createElement('span', {
                key: 'task-text',
                className: `${
                  isCompleted ? 'line-through text-gray-500' : 'text-gray-700'
                }`
              }, task)
            ]);
          }),

          // Custom tasks
          ...(customTasks[block.id] || []).map((task, index) => {
            const taskKey = `${block.id}-custom-${index}`;
            const isCompleted = completedTasks.has(taskKey);
            
            return React.createElement('div', {
              key: `custom-${index}`,
              className: "flex items-center gap-3 p-2 rounded hover:bg-gray-50 bg-blue-25"
            }, [
              React.createElement('button', {
                key: 'custom-task-checkbox',
                onClick: () => toggleTask(block.id, `custom-${index}`),
                className: `w-5 h-5 rounded border-2 flex items-center justify-center ${
                  isCompleted
                    ? 'bg-green-600 border-green-600 text-white'
                    : 'border-gray-300 hover:border-gray-400'
                }`
              }, isCompleted && React.createElement(Check, { className: "w-3 h-3" })),
              React.createElement('span', {
                key: 'custom-task-text',
                className: `flex-1 ${
                  isCompleted ? 'line-through text-gray-500' : 'text-gray-700'
                }`
              }, task),
              React.createElement('button', {
                key: 'remove-task-btn',
                onClick: () => removeCustomTask(block.id, index),
                className: "w-4 h-4 text-gray-400 hover:text-red-600"
              }, React.createElement(X, { className: "w-4 h-4" }))
            ]);
          }),

          // Add task interface
          showAddTask === block.id 
            ? React.createElement('div', {
                key: 'add-task-form',
                className: "flex items-center gap-2 p-2"
              }, [
                React.createElement('input', {
                  key: 'task-input',
                  type: "text",
                  value: newTaskText,
                  onChange: (e) => setNewTaskText(e.target.value),
                  placeholder: "Add custom task...",
                  className: "flex-1 px-3 py-1 border border-gray-300 rounded text-sm",
                  onKeyPress: (e) => e.key === 'Enter' && addCustomTask(block.id)
                }),
                React.createElement('button', {
                  key: 'add-btn',
                  onClick: () => addCustomTask(block.id),
                  className: "px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                }, "Add"),
                React.createElement('button', {
                  key: 'cancel-btn',
                  onClick: () => {
                    setShowAddTask(null);
                    setNewTaskText('');
                  },
                  className: "px-2 py-1 text-gray-600 hover:text-gray-800"
                }, "Cancel")
              ])
            : React.createElement('button', {
                key: 'add-task-btn',
                onClick: () => setShowAddTask(block.id),
                className: "flex items-center gap-2 p-2 w-full text-left text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
              }, [
                React.createElement(Plus, { key: 'plus-icon', className: "w-4 h-4" }),
                React.createElement('span', { key: 'add-text', className: "text-sm" }, "Add custom task")
              ])
        ]),

        block.type === 'flylady' && React.createElement('div', {
          key: 'flylady-reminder',
          className: "mt-3 p-2 bg-pink-50 rounded text-sm text-pink-700"
        }, `💡 Focus on Zone ${currentWeek}: ${flyLadyZones[currentWeek].name}`),

        block.warning && React.createElement('div', {
          key: 'warning',
          className: "mt-3 p-2 bg-red-100 rounded text-sm text-red-700"
        }, "⚠️ Challenging time - Focus on presence and reassurance for grandma")
      ]));
    })),

    // Progress Summary
    React.createElement('div', {
      key: 'progress',
      className: "mt-6 bg-white rounded-lg shadow-lg p-4"
    }, [
      React.createElement('h3', {
        key: 'progress-title',
        className: "font-semibold text-lg mb-3"
      }, "Daily Progress"),
      React.createElement('div', {
        key: 'progress-grid',
        className: "grid grid-cols-2 md:grid-cols-4 gap-4"
      }, ['personal', 'care', 'work', 'flylady'].map(type => {
        const typeBlocks = schedule.filter(block => block.type === type);
          block.tasks.every((_, index) => completedTasks.has(`${block.id}-${index}`))
        );
        
        return React.createElement('div', {
          key: type,
          className: "text-center"
        }, [
          React.createElement('div', {
            key: 'progress-count',
            className: "text-2xl font-bold text-gray-800"
          }, `${completedBlocks.length}/${typeBlocks.length}`),
          React.createElement('div', {
            key: 'progress-label',
            className: "text-sm text-gray-600 capitalize"
          }, type)
        ]);
      }))
    ])
  ]);
};

// Render the app
ReactDOM.render(React.createElement(DailyScheduleApp), document.getElementById('root'));
