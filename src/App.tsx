import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  Building2, 
  ChevronRight, 
  LayoutGrid, 
  FileEdit, 
  ClipboardCheck, 
  ArrowRightCircle,
  Shapes,
  Navigation,
  Globe2,
  Wallet2,
  Landmark,
  Sprout
} from 'lucide-react';
import { WORKFLOW_DATA, WorkflowGroup, Step } from './data';

const LevelIcon = ({ id }: { id: string }) => {
  switch (id) {
    case 'county': return <Navigation className="w-5 h-5" />;
    case 'municipal': return <Building2 className="w-5 h-5" />;
    case 'provincial': return <Globe2 className="w-5 h-5" />;
    default: return <Shapes className="w-5 h-5" />;
  }
};

const CategoryIcon = ({ id }: { id: string }) => {
  if (id.includes('central')) return <Landmark className="w-4 h-4" />;
  if (id.includes('ultra-long')) return <BarChart3 className="w-4 h-4" />;
  if (id.includes('bond')) return <Wallet2 className="w-4 h-4" />;
  if (id.includes('regular')) return <Sprout className="w-4 h-4" />;
  return <LayoutGrid className="w-4 h-4" />;
};

export default function App() {
  const [activeLevelId, setActiveLevelId] = useState<string>('provincial');
  const [activeWorkflowId, setActiveWorkflowId] = useState<string>('');

  const activeLevel = useMemo(() => 
    WORKFLOW_DATA.find(l => l.id === activeLevelId) as WorkflowGroup, 
  [activeLevelId]);

  // Handle workflow switching when level changes
  useEffect(() => {
    if (activeLevel) {
      setActiveWorkflowId(activeLevel.workflows[0].id);
    }
  }, [activeLevelId, activeLevel]);

  const activeWorkflow = useMemo(() => 
    activeLevel.workflows.find(w => w.id === activeWorkflowId) || activeLevel.workflows[0],
  [activeLevel, activeWorkflowId]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg text-white shadow-lg shadow-indigo-200">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-800">工程实施及预算进度监管流程</h1>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {WORKFLOW_DATA.map((level) => (
              <button
                key={level.id}
                onClick={() => setActiveLevelId(level.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${activeLevelId === level.id 
                    ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}
                `}
              >
                <LevelIcon id={level.id} />
                {level.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Mobile Level Selector */}
        <div className="md:hidden flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {WORKFLOW_DATA.map((level) => (
            <button
              key={level.id}
              onClick={() => setActiveLevelId(level.id)}
              className={`
                flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
                ${activeLevelId === level.id 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'bg-white text-slate-600 border border-slate-200'}
              `}
            >
              <LevelIcon id={level.id} />
              {level.name}
            </button>
          ))}
        </div>

        {/* Provincial Category Selector */}
        <AnimatePresence mode="wait">
          {activeLevelId === 'provincial' && (
            <motion.div 
              key="provincial-categories"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-10"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="h-4 w-1 bg-indigo-500 rounded-full"></div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">项目分类流转细则</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {activeLevel.workflows.map((wf) => (
                  <button
                    key={wf.id}
                    onClick={() => setActiveWorkflowId(wf.id)}
                    className={`
                      relative group flex flex-col p-4 rounded-2xl border-2 transition-all duration-300 text-left
                      ${activeWorkflowId === wf.id 
                        ? 'border-indigo-600 bg-white ring-4 ring-indigo-50 shadow-xl' 
                        : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md'}
                    `}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${activeWorkflowId === wf.id ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-50 active:scale-95 transition-transform'}`}>
                        <CategoryIcon id={wf.id} />
                      </div>
                      <span className={`text-sm font-bold ${activeWorkflowId === wf.id ? 'text-indigo-600' : 'text-slate-700'}`}>
                        {wf.title}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Workflow visualization */}
        <motion.div 
          key={`${activeLevelId}-${activeWorkflowId}`}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200 border border-slate-100 relative overflow-hidden"
        >
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none">
             <BarChart3 className="w-64 h-64 text-indigo-600 rotate-12" />
          </div>

          <div className="relative z-10">
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-3">
                 <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold">
                  {activeLevel.name}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-bold">
                  流程模式
                </span>
              </div>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                {activeWorkflow.title}
              </h2>
              <p className="text-slate-500 mt-2 max-w-2xl font-medium">
                标准化预算编报流转程序，确保资金各环节审批合规、路径清晰。
              </p>
            </div>

            {/* Steps Container */}
            <div className="flex flex-col gap-12 relative">
              {/* Connecting line */}
              <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-slate-100 hidden md:block"></div>

              {activeWorkflow.steps.map((step: Step, idx: number) => (
                <WorkflowCard 
                  key={idx} 
                  step={step} 
                  index={idx} 
                  isLast={idx === activeWorkflow.steps.length - 1} 
                />
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

interface WorkflowCardProps {
  step: Step;
  index: number;
  isLast: boolean;
}

const WorkflowCard: React.FC<WorkflowCardProps> = ({ step, index, isLast }) => {
  const getIcon = (idx: number) => {
    if (idx === 0) return <FileEdit className="w-6 h-6" />;
    return <ClipboardCheck className="w-6 h-6" />;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex flex-col md:flex-row items-start gap-8 group"
    >
      {/* Node and Step indicator */}
      <div className="flex-shrink-0 flex md:flex-col items-center gap-4 md:gap-0 relative">
        <div className={`
          z-20 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all group-hover:scale-110 duration-300
          ${index === 0 ? 'bg-indigo-600 text-white shadow-indigo-200 ring-4 ring-indigo-50' : 'bg-white border-2 border-slate-200 text-slate-400 group-hover:border-indigo-300 group-hover:text-indigo-500'}
        `}>
          {getIcon(index)}
        </div>
        {!isLast && (
          <div className="md:hidden flex-grow flex justify-center text-slate-300">
            <ChevronRight className="w-8 h-8" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-grow pt-2">
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
          <span className="text-xs font-black text-indigo-500 uppercase tracking-tighter bg-indigo-50 px-2 py-0.5 rounded">
            STEP 0{index + 1}
          </span>
          <div className="h-1 w-1 bg-slate-300 rounded-full hidden md:block"></div>
          <span className="text-slate-800 font-extrabold text-xl tracking-tight">
            {step.role}
          </span>
        </div>
        
        <div className="bg-white md:bg-white border border-slate-100 p-6 rounded-3xl group-hover:bg-indigo-50/30 group-hover:border-indigo-100 transition-all duration-300 shadow-sm group-hover:shadow-md">
          <div className="text-slate-900 font-bold text-lg mb-2 flex items-center gap-2">
            {step.title}
          </div>
          <p className="text-slate-500 text-sm leading-relaxed font-medium">
            {step.description}
          </p>
        </div>

        {/* Dispatch task marker removed as per user request */}
      </div>
    </motion.div>
  );
}
