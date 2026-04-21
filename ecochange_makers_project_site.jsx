import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Leaf, Recycle, Waves, Users, ChartColumnIncreasing, DollarSign, MapPin, School, Bus, Camera, ArrowRight, Menu, X, CheckCircle2, TrendingUp, Factory, Landmark, Truck, Info } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend, AreaChart, Area } from 'recharts';

const pages = [
  { id: 'home', label: 'Home' },
  { id: 'problem', label: 'Problem' },
  { id: 'solution', label: 'Solution' },
  { id: 'plan', label: 'Implementation' },
  { id: 'outcome', label: 'Outcomes' },
  { id: 'finance', label: 'Finance' },
  { id: 'team', label: 'Team' },
  { id: 'gallery', label: 'Booth Gallery' },
  { id: 'faq', label: 'FAQ' },
];

const sectionFade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

function Nav({ current, setCurrent }) {
  const [open, setOpen] = useState(false);
  const [hiddenOnScroll, setHiddenOnScroll] = useState(false);

  useEffect(() => {
    let lastScrollY = 0;

    const handleScroll = () => {
      const isDesktop = window.innerWidth >= 768;
      const nextScrollY = window.scrollY;

      if (isDesktop) {
        setHiddenOnScroll(false);
        lastScrollY = nextScrollY;
        return;
      }

      if (open) {
        setHiddenOnScroll(false);
        lastScrollY = nextScrollY;
        return;
      }

      const scrollingDown = nextScrollY > lastScrollY;
      setHiddenOnScroll(scrollingDown && nextScrollY > 64);
      lastScrollY = nextScrollY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b border-emerald-100/80 bg-white/90 backdrop-blur transition-transform duration-300 md:sticky md:top-0 md:translate-y-0 ${hiddenOnScroll ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="mx-auto flex w-full max-w-[1800px] items-center justify-between px-3 py-3 sm:px-4 lg:px-5">
        <button className="flex items-center gap-3 text-left" onClick={() => setCurrent('home')}>
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm">
            <Recycle className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-semibold tracking-wide text-emerald-700">Team EcoChange Makers</div>
            <div className="text-xs text-slate-500">Smart Plastic Drop Booth Project</div>
          </div>
        </button>

        <nav className="hidden items-center gap-2 md:flex">
          {pages.map((p) => (
            <button
              key={p.id}
              onClick={() => setCurrent(p.id)}
              className={`rounded-full px-4 py-2 text-sm transition ${current === p.id ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'}`}
            >
              {p.label}
            </button>
          ))}
        </nav>

        <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6 text-slate-700" /> : <Menu className="h-6 w-6 text-slate-700" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-emerald-100 bg-white px-4 py-3 md:hidden">
          <div className="grid gap-2">
            {pages.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setCurrent(p.id);
                  setOpen(false);
                }}
                className={`rounded-xl px-3 py-2 text-left text-sm ${current === p.id ? 'bg-emerald-600 text-white' : 'text-slate-700 hover:bg-emerald-50'}`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function MobileHorizontalScroll({ children, className = '', contentClassName = '' }) {
  const scrollRef = useRef(null);
  const touchStateRef = useRef({ startX: 0, startY: 0, scrollLeft: 0, axis: null });

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    touchStateRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      scrollLeft: scrollRef.current?.scrollLeft ?? 0,
      axis: null,
    };
  };

  const handleTouchMove = (event) => {
    const container = scrollRef.current;
    if (!container) return;

    const touch = event.touches[0];
    const deltaX = touch.clientX - touchStateRef.current.startX;
    const deltaY = touch.clientY - touchStateRef.current.startY;

    if (!touchStateRef.current.axis) {
      touchStateRef.current.axis = Math.abs(deltaX) > Math.abs(deltaY) ? 'x' : 'y';
    }

    if (touchStateRef.current.axis !== 'x') return;

    event.preventDefault();
    container.scrollLeft = touchStateRef.current.scrollLeft - deltaX;
  };

  return (
    <div
      ref={scrollRef}
      className={`w-full overflow-x-auto overflow-y-hidden overscroll-x-contain ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      <div className={contentClassName}>{children}</div>
    </div>
  );
}

function Hero({ setCurrent }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.12),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(14,165,233,0.12),_transparent_30%)]" />
      <div className="relative mx-auto grid w-full max-w-[1800px] gap-10 px-3 py-16 sm:px-4 md:grid-cols-2 lg:px-5 md:py-24">
        <motion.div variants={sectionFade} initial="hidden" animate="show" className="flex flex-col justify-center gap-6">
          <Badge className="w-fit rounded-full bg-emerald-100 px-4 py-1 text-emerald-800 hover:bg-emerald-100">
            BRAC UDP x Team EcoChange Makers
          </Badge>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-6xl">
              Improving plastic waste collection in <span className="text-emerald-600">Cox’s Bazar</span>
            </h1>
            <p className="max-w-xl text-base leading-7 text-slate-600 md:text-lg">
              A practical, scalable, and sponsor-supported system built around Smart Plastic Drop Booths — designed to make the right environmental action easy, visible, and sustainable.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setCurrent('solution')} className="rounded-full bg-emerald-600 px-6 hover:bg-emerald-700">
              Explore the solution
            </Button>
            <Button variant="outline" onClick={() => setCurrent('finance')} className="rounded-full border-emerald-200 px-6 text-emerald-700 hover:bg-emerald-50">
              See the financial model
            </Button>
          </div>
          <div className="grid max-w-xl grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
            {[
              ['4→10→30', 'Booth scaling path'],
              ['Plastic-only', 'Cleaner segregation'],
              ['Sponsor-led', 'Self-sustaining model'],
              ['Schools + Roads', 'Placement strategy'],
            ].map(([big, small]) => (
              <Card key={big} className="rounded-2xl border-emerald-100 shadow-none">
                <CardContent className="p-4">
                  <div className="text-lg font-semibold text-slate-900">{big}</div>
                  <div className="text-xs text-slate-500">{small}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div variants={sectionFade} initial="hidden" animate="show" className="flex items-center justify-center">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-emerald-100 bg-white p-4 shadow-xl shadow-emerald-100/40">
            <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[1.5rem] bg-gradient-to-br from-emerald-500 to-sky-500 p-6 text-white">
                <div className="mb-6 flex items-center justify-between">
                  <Badge className="rounded-full bg-white/20 text-white hover:bg-white/20">Concept Overview</Badge>
                  <Leaf className="h-5 w-5" />
                </div>
                <h3 className="text-2xl font-semibold">Smart Plastic Drop Booth</h3>
                <p className="mt-3 text-sm leading-6 text-white/90">
                  A visible, easy-to-use plastic-only drop point that fits into the existing waste chain and supports long-term behavior change.
                </p>
                <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs">
                  {['School', 'Roadside', 'Beachside'].map((item) => (
                    <div key={item} className="rounded-2xl bg-white/15 p-3 backdrop-blur-sm">{item}</div>
                  ))}
                </div>
              </div>
              <div className="grid gap-4">
                <Card className="rounded-[1.5rem] border-emerald-100 shadow-none">
                  <CardContent className="p-5">
                    <div className="mb-2 flex items-center gap-2 text-emerald-700"><Recycle className="h-4 w-4" /> Existing System</div>
                    <p className="text-sm leading-6 text-slate-600">Households and students drop plastic → collectors gather it → aggregators process it → BRAC facility receives it.</p>
                  </CardContent>
                </Card>
                <Card className="rounded-[1.5rem] border-sky-100 shadow-none">
                  <CardContent className="p-5">
                    <div className="mb-2 flex items-center gap-2 text-sky-700"><DollarSign className="h-4 w-4" /> Sustainability</div>
                    <p className="text-sm leading-6 text-slate-600">Moderate sponsor packages plus plastic recovery help sustain operations and support future scale.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HomePage({ setCurrent }) {
  return (
    <div>
      <Hero setCurrent={setCurrent} />

      <section className="mx-auto w-full max-w-[1800px] px-3 py-8 sm:px-4 lg:px-5 md:py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Waves,
              title: 'The challenge',
              text: 'Cox’s Bazar faces rising plastic waste due to tourism, population pressure, and leakage into drains, land, and marine environments.',
            },
            {
              icon: Users,
              title: 'The insight',
              text: 'Awareness exists, but action is difficult. Low-value plastics like thin poly are often ignored because they lack value and easy collection points.',
            },
            {
              icon: Recycle,
              title: 'The response',
              text: 'Smart Plastic Drop Booths make proper disposal visible, easy, and compatible with the existing collection chain already used by BRAC UDP.',
            },
          ].map((item) => (
            <Card key={item.title} className="rounded-3xl border-emerald-100 shadow-none">
              <CardContent className="p-6">
                <item.icon className="mb-4 h-9 w-9 text-emerald-600" />
                <h3 className="mb-2 text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="text-sm leading-6 text-slate-600">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1800px] px-3 py-8 sm:px-4 lg:px-5 md:py-12">
        <Card className="rounded-[2rem] border-emerald-100 bg-slate-900 text-white shadow-none">
          <CardContent className="grid gap-6 p-8 md:grid-cols-[1.3fr_0.7fr] md:p-10">
            <div>
              <div className="mb-3 text-sm font-medium tracking-wide text-emerald-300">Why this project matters</div>
              <h2 className="text-3xl font-semibold">Not just awareness — a system that keeps working</h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
                Team EcoChange Makers developed this concept to move beyond one-time campaigns. The project focuses on behavior, visibility, and a financial model that can sustain operations through moderate sponsorship and recovered plastic value.
              </p>
            </div>
            <div className="grid gap-3">
              {['Low-cost to pilot', 'Fits existing waste chain', 'Supports sponsor visibility', 'Designed for long-term use'].map((x) => (
                <div key={x} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100">{x}</div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function ProblemPage() {
  return (
    <div className="mx-auto w-full max-w-[1800px] px-3 py-10 sm:px-4 lg:px-5 md:py-14">
        <motion.div variants={sectionFade} initial="hidden" animate="show" className="space-y-8">
        <div className="space-y-3">
          <Badge className="rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Problem Overview</Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Why plastic waste in Cox’s Bazar needs a new response</h1>
          <p className="max-w-4xl text-base leading-7 text-slate-600">
            The project begins with a simple reality: plastic pollution is visible, persistent, and highly damaging in Cox’s Bazar. Low-value plastics are often ignored, mixed with general waste, and leaked into the environment.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-3xl border-emerald-100 shadow-none">
            <CardHeader>
              <CardTitle className="text-xl">Main drivers of the problem</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-slate-600">
              <div className="flex gap-3"><MapPin className="mt-1 h-4 w-4 text-emerald-600" /> Tourism and high public activity increase plastic waste generation.</div>
              <div className="flex gap-3"><Users className="mt-1 h-4 w-4 text-emerald-600" /> Population pressure and community density make waste management harder.</div>
              <div className="flex gap-3"><Waves className="mt-1 h-4 w-4 text-emerald-600" /> Leakage into drains, land, and the sea creates visible environmental harm.</div>
              <div className="flex gap-3"><Recycle className="mt-1 h-4 w-4 text-emerald-600" /> Low-value plastics such as thin poly are often overlooked by the value-driven waste chain.</div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-sky-100 shadow-none">
            <CardHeader>
              <CardTitle className="text-xl">Core insights from the project</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-slate-600">
              <div>
                <div className="font-medium text-slate-900">1. The system works — but only partially</div>
                <p>PET bottles are collected because they have value. Thin poly and other low-value plastic are much more likely to be ignored.</p>
              </div>
              <div>
                <div className="font-medium text-slate-900">2. Awareness is not enough</div>
                <p>People may know plastic pollution is harmful, but without a convenient action point, awareness does not become behavior.</p>
              </div>
              <div>
                <div className="font-medium text-slate-900">3. Small behavior changes matter</div>
                <p>A clear plastic-only drop point can shape daily habits, and repeated habits can create large long-term impact.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}

function SolutionPage() {
  return (
    <div className="mx-auto w-full max-w-[1800px] px-3 py-10 sm:px-4 lg:px-5 md:py-14">
        <motion.div variants={sectionFade} initial="hidden" animate="show" className="space-y-8">
        <div className="space-y-3">
          <Badge className="rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Solution</Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Smart Plastic Drop Booth</h1>
          <p className="max-w-4xl text-base leading-7 text-slate-600">
            A plastic-only drop point designed for schools and public areas, created to make proper disposal easy, visible, and compatible with the existing waste collection system.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="rounded-[2rem] border-emerald-100 shadow-none">
            <CardHeader>
              <CardTitle className="text-xl">Why this idea was chosen</CardTitle>
              <CardDescription>Built as a long-term system, not a one-time campaign</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm leading-6 text-slate-600 sm:grid-cols-2">
              {[
                'Low-cost compared with large infrastructure ideas',
                'Easy for households and students to understand',
                'Supports early segregation of plastic',
                'Does not replace collectors or aggregators',
                'Can grow through sponsor support over time',
                'Turns awareness into a repeatable daily action',
              ].map((t) => (
                <div key={t} className="rounded-2xl bg-emerald-50/70 p-4">{t}</div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-sky-100 shadow-none">
            <CardHeader>
              <CardTitle className="text-xl">How it is different from a normal bin</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-slate-600">
              <div className="rounded-2xl border border-sky-100 p-4">
                <div className="mb-1 font-medium text-slate-900">Normal roadside bins</div>
                <p>Mix all waste together, reduce recycling quality, and do not create a clear action for plastic separation.</p>
              </div>
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4">
                <div className="mb-1 font-medium text-slate-900">Smart Plastic Drop Booths</div>
                <p>Are plastic-only, more visible, clearly labeled, and designed to guide behavior. They help users understand exactly what to do.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="mb-1 font-medium text-slate-900">Behavior effect</div>
                <p>When the correct action is obvious and easy, people are more likely to repeat it. That repeated action becomes habit over time.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}

function PlanPage() {
  const phases = useMemo(
    () => [
      {
        title: 'Phase 1: Pilot',
        booths: '4 booths',
        detail: 'Start in one ward, with a mix of school and roadside placement to test usage, visibility, and collection patterns.',
      },
      {
        title: 'Phase 2: Scale-up',
        booths: '10 booths',
        detail: 'Expand after the pilot proves operationally viable and monthly running costs are covered through combined income streams.',
      },
      {
        title: 'Phase 3: Network model',
        booths: '30 booths',
        detail: 'Move to a sponsor-backed booth network with stronger route efficiency, lower cost per booth, and broader public visibility.',
      },
    ],
    []
  );

  return (
    <div className="mx-auto w-full max-w-[1800px] px-3 py-10 sm:px-4 lg:px-5 md:py-14">
      <motion.div variants={sectionFade} initial="hidden" animate="show" className="space-y-8">
        <div className="space-y-3">
          <Badge className="rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Implementation</Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">How the project will be implemented</h1>
          <p className="max-w-4xl text-base leading-7 text-slate-600">
            The project is designed to scale gradually. The plan starts small, validates the system in real life, and then expands based on performance rather than assumption.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {phases.map((phase, index) => (
            <Card key={phase.title} className="rounded-3xl border-emerald-100 shadow-none">
              <CardHeader>
                <CardDescription>Step {index + 1}</CardDescription>
                <CardTitle className="text-xl">{phase.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-3 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">{phase.booths}</div>
                <p className="text-sm leading-6 text-slate-600">{phase.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="rounded-[2rem] border-sky-100 shadow-none">
          <CardHeader>
            <CardTitle className="text-xl">Step-by-step flow</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-5">
            {[
              ['1', 'Booths placed in targeted school and public sites'],
              ['2', 'Users drop plastic into the booth'],
              ['3', 'Collectors pick up plastic from booths'],
              ['4', 'Aggregators process and transfer material'],
              ['5', 'BRAC recycling facility receives plastic'],
            ].map(([n, t]) => (
              <div key={n} className="rounded-2xl bg-sky-50/60 p-4 text-sm leading-6 text-slate-700">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 text-sm font-semibold text-white">{n}</div>
                {t}
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function OutcomePage() {
  const phasedOutcomes = [
    {
      stage: 'After initial field visit',
      timing: 'Pre-pilot / planning stage',
      focus: 'Validation and readiness',
      expected: [
        'Priority hotspots identified in one target ward, especially around roadside dumping points and high-footfall public spaces.',
        'Shortlist of 4 pilot booth locations validated, likely mixing 2 school/community sites and 2 roadside/public sites.',
        'Local stakeholder buy-in initiated through discussions with school representatives, collectors, aggregators, and ward-level actors.',
        'Behavior gap confirmed: awareness exists, but public users still lack a visible plastic-only disposal option.',
      ],
      indicators: [
        ['Target ward mapped', '1 ward'],
        ['Pilot sites shortlisted', '4 sites'],
        ['Stakeholder groups engaged', 'Schools, collectors, aggregators, community actors'],
        ['Operational model validated', 'Existing BRAC chain can absorb pilot plastic'],
      ],
    },
    {
      stage: 'After initial setup',
      timing: 'Pilot launch: first 3–6 months',
      focus: 'Early operational proof',
      expected: [
        'Booths become visible public disposal points and begin shifting a minority of users from mixed bins to plastic-only disposal.',
        'Collectors test a repeatable pickup pattern from booth locations without disrupting the existing value chain.',
        'Early school-based behavior change appears through repeated exposure, signage, and student familiarity.',
        'Pilot begins demonstrating cleaner segregation than normal mixed roadside bins.',
      ],
      indicators: [
        ['Pilot booths active', '4 booths'],
        ['Expected collection rate', '1.1 kg/booth/day'],
        ['Expected monthly plastic recovered', '132 kg/month'],
        ['Expected sponsor support', '1 local sponsor package'],
      ],
    },
    {
      stage: 'After first expansion',
      timing: 'Scale to 10 booths',
      focus: 'Ward-level visibility and routine',
      expected: [
        'Collection becomes more regular and public visibility improves because booths appear in multiple locations instead of a single cluster.',
        'More households and students recognize the booth as a plastic-only action point, strengthening daily habit formation.',
        'Sponsor value becomes clearer because the booths now function as a visible public-interest network rather than isolated units.',
        'Per-booth operating cost falls as pickup and maintenance become more route-efficient.',
      ],
      indicators: [
        ['Active booths', '10 booths'],
        ['Expected collection rate', '1.4 kg/booth/day'],
        ['Expected monthly plastic recovered', '420 kg/month'],
        ['Expected recurring sponsor package', 'Tk 15,000/month'],
      ],
    },
    {
      stage: 'Final expected outcome',
      timing: 'Network stage / 30 booths',
      focus: 'System-level demonstration',
      expected: [
        'A recognizable booth network supports long-term disposal habits and visibly improves access to plastic-only collection points.',
        'The system strengthens BRAC UDP’s circular model by pushing more plastic into the existing collection and recycling chain.',
        'Bundled sponsor contracts support operations more steadily than one-time awareness campaigns.',
        'The project begins to function as a replicable pilot model for expansion to more wards if outcomes remain positive.',
      ],
      indicators: [
        ['Network size', '30 booths'],
        ['Expected collection rate', '1.6 kg/booth/day'],
        ['Expected monthly plastic recovered', '1,440 kg/month'],
        ['Expected cumulative cashflow turns positive', 'Around Month 23'],
      ],
    },
  ];

  const outcomeChartData = [
    { stage: 'Field visit', booths: 0, monthlyPlasticKg: 0, visibilityScore: 15, sponsorReadiness: 20 },
    { stage: 'Initial setup', booths: 4, monthlyPlasticKg: 132, visibilityScore: 35, sponsorReadiness: 40 },
    { stage: '10-booth scale', booths: 10, monthlyPlasticKg: 420, visibilityScore: 65, sponsorReadiness: 70 },
    { stage: '30-booth network', booths: 30, monthlyPlasticKg: 1440, visibilityScore: 90, sponsorReadiness: 85 },
  ];

  return (
    <div className="mx-auto w-full max-w-[1800px] px-3 py-10 sm:px-4 lg:px-5 md:py-14">
      <motion.div variants={sectionFade} initial="hidden" animate="show" className="space-y-8">
        <div className="space-y-3">
          <Badge className="rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Expected Outcomes</Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Expected outcomes across the project journey</h1>
          <p className="max-w-5xl text-base leading-7 text-slate-600">
            These outcomes are projections, not actual results. They are based on the BRAC UDP project direction, the pilot model used for this website, and the financial and operational assumptions developed for the Smart Plastic Drop Booth concept. The goal is to show what success could look like at each stage, from field validation to a broader booth network.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="rounded-[2rem] border-emerald-100 shadow-none">
            <CardHeader>
              <CardTitle className="text-xl">Outcome logic</CardTitle>
              <CardDescription>How we estimated expected impact</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm leading-6 text-slate-600">
              {[
                'Early outcomes focus on validation, visibility, and stakeholder readiness rather than large collection volume.',
                'Pilot-stage outcomes are based on 4 active booths and a conservative collection rate of 1.1 kg per booth per day.',
                'Growth-stage outcomes assume better route efficiency, stronger public recognition, and more stable sponsor support.',
                'Final outcomes are framed as a system demonstration: more visible disposal points, better plastic capture, and stronger circular-economy linkage.',
                'Outcome expectations are intentionally moderate, because the project has not yet been implemented in the field.',
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl bg-emerald-50/60 p-4">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-sky-100 shadow-none">
            <CardHeader>
              <CardTitle className="text-xl">Expected growth indicators</CardTitle>
              <CardDescription>Illustrative view of network scale, plastic flow, visibility, and sponsor readiness</CardDescription>
            </CardHeader>
            <CardContent className="h-[340px] p-2 sm:p-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={outcomeChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="stage" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="monthlyPlasticKg" stroke="#10b981" strokeWidth={3} name="Expected monthly plastic (kg)" />
                  <Line type="monotone" dataKey="visibilityScore" stroke="#0ea5e9" strokeWidth={3} name="Visibility / behavior signal" />
                  <Line type="monotone" dataKey="sponsorReadiness" stroke="#0f172a" strokeWidth={3} name="Sponsor readiness score" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6">
          {phasedOutcomes.map((section) => (
            <Card key={section.stage} className="rounded-[2rem] border-emerald-100 shadow-none">
              <CardHeader>
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle className="text-2xl">{section.stage}</CardTitle>
                    <CardDescription>{section.timing} · {section.focus}</CardDescription>
                  </div>
                  <Badge className="w-fit rounded-full bg-sky-100 text-sky-800 hover:bg-sky-100">Expected outcome stage</Badge>
                </div>
              </CardHeader>
              <CardContent className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                <div>
                  <div className="mb-3 text-sm font-medium text-slate-500">What we expect to see</div>
                  <div className="grid gap-3">
                    {section.expected.map((item) => (
                      <div key={item} className="rounded-2xl bg-emerald-50/60 p-4 text-sm leading-6 text-slate-700">{item}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="mb-3 text-sm font-medium text-slate-500">Illustrative indicators</div>
                  <div className="overflow-x-auto overscroll-x-contain">
                    <table className="w-full table-auto text-left text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-500">
                          <th className="px-2 py-2 font-medium whitespace-nowrap">Indicator</th>
                          <th className="px-2 py-2 font-medium whitespace-nowrap">Expected value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.indicators.map(([label, value]) => (
                          <tr key={label} className="border-b border-slate-100">
                            <td className="px-2 py-2 font-medium text-slate-900">{label}</td>
                            <td className="px-2 py-2 text-emerald-700">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function FinancePage() {
  const assumptions = [
    {
      category: 'Waste context',
      item: 'Improperly dumped plastic in Cox’s Bazar',
      value: '34.5 tons/day',
      why: 'Shows the problem is large enough to justify intervention.',
    },
    {
      category: 'Downstream system',
      item: 'BRAC facility trial throughput',
      value: '5 tons/month',
      why: 'Confirms a real recycling outlet already exists.',
    },
    {
      category: 'Plastic value',
      item: 'Recovery value used',
      value: 'Tk 22/kg',
      why: 'Conservative blended value below public buyback rates.',
    },
    {
      category: 'Collection',
      item: 'Pilot collection rate',
      value: '1.1 kg/booth/day',
      why: 'Modest assumption for a non-cash booth system.',
    },
    {
      category: 'Collection',
      item: '10-booth collection rate',
      value: '1.4 kg/booth/day',
      why: 'Improves with visibility and placement learning.',
    },
    {
      category: 'Collection',
      item: '30-booth collection rate',
      value: '1.6 kg/booth/day',
      why: 'Still conservative even at network scale.',
    },
    {
      category: 'Sponsors',
      item: 'Pilot sponsor contract',
      value: 'Tk 6,000/month',
      why: 'Small local partner package for 4 booths.',
    },
    {
      category: 'Sponsors',
      item: '10-booth sponsor contract',
      value: 'Tk 15,000/month',
      why: 'Bundled ward-level sponsorship rather than per booth.',
    },
    {
      category: 'Sponsors',
      item: '30-booth sponsor contract',
      value: 'Tk 30,000/month',
      why: 'Anchor network package with lower income per booth.',
    },
  ];

  const initialCostBreakdown = [
    { item: 'Booth structures', unit: 'Tk 18,000', qty: '4', total: 72000, note: 'Small fabricated branded booth estimate.' },
    { item: 'Transport, installation, launch materials', unit: 'Fixed', qty: '1', total: 16000, note: 'Initial local deployment and starter awareness materials.' },
  ];

  const expansionCostBreakdown = [
    { stage: 'Scale to 10 booths', gross: 112000, support: 40000, net: 72000, note: '6 new booths + install refresh, partly offset by sponsor setup support.' },
    { stage: 'Scale to 30 booths', gross: 340000, support: 120000, net: 220000, note: '20 new booths + larger deployment + sponsor activation support.' },
  ];

  const opexBreakdown = [
    { stage: '4 booths', operator: 8000, transport: 300, maintenance: 200, misc: 0, total: 8500, perBooth: 2125 },
    { stage: '10 booths', operator: 10000, transport: 1500, maintenance: 800, misc: 700, total: 13000, perBooth: 1300 },
    { stage: '30 booths', operator: 18000, transport: 5000, maintenance: 2000, misc: 2000, total: 27000, perBooth: 900 },
  ];

  const sponsorBreakdown = [
    { stage: 'Pilot', booths: 4, total: 6000, perBooth: 1500, type: 'Small local package' },
    { stage: 'Scale 1', booths: 10, total: 15000, perBooth: 1500, type: 'Bundled ward-level package' },
    { stage: 'Scale 2', booths: 30, total: 30000, perBooth: 1000, type: 'Anchor network contract' },
  ];

  const plasticFormulaRows = [
    { stage: 'Pilot', booths: 4, rate: 1.1, days: 30, monthlyKg: 132, price: 22, revenue: 2904 },
    { stage: 'Scale 1', booths: 10, rate: 1.4, days: 30, monthlyKg: 420, price: 22, revenue: 9240 },
    { stage: 'Scale 2', booths: 30, rate: 1.6, days: 30, monthlyKg: 1440, price: 22, revenue: 31680 },
  ];

  const monthlyRows = [
    { month: 0, booths: 0, kgDay: 0, plasticKg: 0, plasticRevenue: 0, sponsorRecurring: 0, sponsorSupport: 0, inflow: 0, opex: 0, capex: 88000, net: -88000, cumulative: -88000, phase: 'Setup' },
    { month: 1, booths: 4, kgDay: 1.1, plasticKg: 132, plasticRevenue: 2904, sponsorRecurring: 6000, sponsorSupport: 0, inflow: 8904, opex: 8500, capex: 0, net: 404, cumulative: -87596, phase: 'Pilot' },
    { month: 2, booths: 4, kgDay: 1.1, plasticKg: 132, plasticRevenue: 2904, sponsorRecurring: 6000, sponsorSupport: 0, inflow: 8904, opex: 8500, capex: 0, net: 404, cumulative: -87192, phase: 'Pilot' },
    { month: 3, booths: 4, kgDay: 1.1, plasticKg: 132, plasticRevenue: 2904, sponsorRecurring: 6000, sponsorSupport: 0, inflow: 8904, opex: 8500, capex: 0, net: 404, cumulative: -86788, phase: 'Pilot' },
    { month: 4, booths: 4, kgDay: 1.1, plasticKg: 132, plasticRevenue: 2904, sponsorRecurring: 6000, sponsorSupport: 0, inflow: 8904, opex: 8500, capex: 0, net: 404, cumulative: -86384, phase: 'Pilot' },
    { month: 5, booths: 4, kgDay: 1.1, plasticKg: 132, plasticRevenue: 2904, sponsorRecurring: 6000, sponsorSupport: 0, inflow: 8904, opex: 8500, capex: 0, net: 404, cumulative: -85980, phase: 'Pilot' },
    { month: 6, booths: 4, kgDay: 1.1, plasticKg: 132, plasticRevenue: 2904, sponsorRecurring: 6000, sponsorSupport: 0, inflow: 8904, opex: 8500, capex: 0, net: 404, cumulative: -85576, phase: 'Pilot' },
    { month: 7, booths: 10, kgDay: 1.4, plasticKg: 420, plasticRevenue: 9240, sponsorRecurring: 15000, sponsorSupport: 40000, inflow: 64240, opex: 13000, capex: 112000, net: -60760, cumulative: -146336, phase: 'Scale 1' },
    { month: 8, booths: 10, kgDay: 1.4, plasticKg: 420, plasticRevenue: 9240, sponsorRecurring: 15000, sponsorSupport: 0, inflow: 24240, opex: 13000, capex: 0, net: 11240, cumulative: -135096, phase: 'Scale 1' },
    { month: 9, booths: 10, kgDay: 1.4, plasticKg: 420, plasticRevenue: 9240, sponsorRecurring: 15000, sponsorSupport: 0, inflow: 24240, opex: 13000, capex: 0, net: 11240, cumulative: -123856, phase: 'Scale 1' },
    { month: 10, booths: 10, kgDay: 1.4, plasticKg: 420, plasticRevenue: 9240, sponsorRecurring: 15000, sponsorSupport: 0, inflow: 24240, opex: 13000, capex: 0, net: 11240, cumulative: -112616, phase: 'Scale 1' },
    { month: 11, booths: 10, kgDay: 1.4, plasticKg: 420, plasticRevenue: 9240, sponsorRecurring: 15000, sponsorSupport: 0, inflow: 24240, opex: 13000, capex: 0, net: 11240, cumulative: -101376, phase: 'Scale 1' },
    { month: 12, booths: 10, kgDay: 1.4, plasticKg: 420, plasticRevenue: 9240, sponsorRecurring: 15000, sponsorSupport: 0, inflow: 24240, opex: 13000, capex: 0, net: 11240, cumulative: -90136, phase: 'Scale 1' },
    { month: 13, booths: 10, kgDay: 1.4, plasticKg: 420, plasticRevenue: 9240, sponsorRecurring: 15000, sponsorSupport: 0, inflow: 24240, opex: 13000, capex: 0, net: 11240, cumulative: -78896, phase: 'Scale 1' },
    { month: 14, booths: 10, kgDay: 1.4, plasticKg: 420, plasticRevenue: 9240, sponsorRecurring: 15000, sponsorSupport: 0, inflow: 24240, opex: 13000, capex: 0, net: 11240, cumulative: -67656, phase: 'Scale 1' },
    { month: 15, booths: 10, kgDay: 1.4, plasticKg: 420, plasticRevenue: 9240, sponsorRecurring: 15000, sponsorSupport: 0, inflow: 24240, opex: 13000, capex: 0, net: 11240, cumulative: -56416, phase: 'Scale 1' },
    { month: 16, booths: 30, kgDay: 1.6, plasticKg: 1440, plasticRevenue: 31680, sponsorRecurring: 30000, sponsorSupport: 120000, inflow: 181680, opex: 27000, capex: 340000, net: -185320, cumulative: -241736, phase: 'Scale 2' },
    { month: 17, booths: 30, kgDay: 1.6, plasticKg: 1440, plasticRevenue: 31680, sponsorRecurring: 30000, sponsorSupport: 0, inflow: 61680, opex: 27000, capex: 0, net: 34680, cumulative: -207056, phase: 'Scale 2' },
    { month: 18, booths: 30, kgDay: 1.6, plasticKg: 1440, plasticRevenue: 31680, sponsorRecurring: 30000, sponsorSupport: 0, inflow: 61680, opex: 27000, capex: 0, net: 34680, cumulative: -172376, phase: 'Scale 2' },
    { month: 19, booths: 30, kgDay: 1.6, plasticKg: 1440, plasticRevenue: 31680, sponsorRecurring: 30000, sponsorSupport: 0, inflow: 61680, opex: 27000, capex: 0, net: 34680, cumulative: -137696, phase: 'Scale 2' },
    { month: 20, booths: 30, kgDay: 1.6, plasticKg: 1440, plasticRevenue: 31680, sponsorRecurring: 30000, sponsorSupport: 0, inflow: 61680, opex: 27000, capex: 0, net: 34680, cumulative: -103016, phase: 'Scale 2' },
    { month: 21, booths: 30, kgDay: 1.6, plasticKg: 1440, plasticRevenue: 31680, sponsorRecurring: 30000, sponsorSupport: 0, inflow: 61680, opex: 27000, capex: 0, net: 34680, cumulative: -68336, phase: 'Scale 2' },
    { month: 22, booths: 30, kgDay: 1.6, plasticKg: 1440, plasticRevenue: 31680, sponsorRecurring: 30000, sponsorSupport: 0, inflow: 61680, opex: 27000, capex: 0, net: 34680, cumulative: -33656, phase: 'Scale 2' },
    { month: 23, booths: 30, kgDay: 1.6, plasticKg: 1440, plasticRevenue: 31680, sponsorRecurring: 30000, sponsorSupport: 0, inflow: 61680, opex: 27000, capex: 0, net: 34680, cumulative: 1024, phase: 'Scale 2' },
    { month: 24, booths: 30, kgDay: 1.6, plasticKg: 1440, plasticRevenue: 31680, sponsorRecurring: 30000, sponsorSupport: 0, inflow: 61680, opex: 27000, capex: 0, net: 34680, cumulative: 35704, phase: 'Scale 2' },
  ];

  const summaryCards = [
    { label: 'Initial setup cost', value: 'Tk 88,000', icon: Factory },
    { label: 'Break-even month', value: 'Month 23', icon: TrendingUp },
    { label: 'Final 24-month net', value: 'Tk 35,704', icon: DollarSign },
    { label: 'Final network size', value: '30 booths', icon: Landmark },
  ];

  const phaseSummary = [
    { phase: 'Pilot', period: 'Months 1–6', booths: 4, plasticRevenue: 17424, sponsorRecurring: 36000, sponsorSupport: 0, opex: 51000, capex: 88000, net: -85576 },
    { phase: 'Scale 1', period: 'Months 7–15', booths: 10, plasticRevenue: 83160, sponsorRecurring: 135000, sponsorSupport: 40000, opex: 117000, capex: 112000, net: 29160 },
    { phase: 'Scale 2', period: 'Months 16–24', booths: 30, plasticRevenue: 285120, sponsorRecurring: 270000, sponsorSupport: 120000, opex: 243000, capex: 340000, net: 92120 },
  ];

  const chartData = monthlyRows.map((row) => ({
    month: `M${row.month}`,
    net: row.net,
    cumulative: row.cumulative,
    plasticRevenue: row.plasticRevenue,
    sponsorRecurring: row.sponsorRecurring,
    opex: row.opex,
    capex: row.capex,
  }));

  const currency = (n) => `Tk ${Number(n).toLocaleString()}`;

  const mobileAssumptions = assumptions;
  const mobileInitialCostBreakdown = initialCostBreakdown;
  const mobileExpansionCostBreakdown = expansionCostBreakdown;
  const mobileOpexBreakdown = opexBreakdown;
  const mobileSponsorBreakdown = sponsorBreakdown;
  const mobilePlasticFormulaRows = plasticFormulaRows;
  const [isMobileView, setIsMobileView] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 768);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="mx-auto w-full max-w-[1800px] px-3 py-10 sm:px-4 lg:px-5 md:py-14">
      <motion.div variants={sectionFade} initial="hidden" animate="show" className="space-y-8">
        <div className="space-y-3">
          <Badge className="rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Finance</Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Detailed 2-year financial breakdown</h1>
          <p className="max-w-5xl text-base leading-7 text-slate-600">
            This section explains every major assumption, every cost line, every revenue stream, and the full month-by-month cashflow for the 4 → 10 → 30 booth rollout. The model is intentionally conservative and designed to be easy for sponsors and reviewers to understand.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => (
            <Card key={card.label} className="rounded-3xl border-emerald-100 shadow-none">
              <CardContent className="p-4 sm:p-6">
                <card.icon className="mb-4 h-8 w-8 text-emerald-600" />
                <div className="text-xs sm:text-sm text-slate-500">{card.label}</div>
                <div className="mt-1 text-xl sm:text-2xl font-semibold text-slate-900">{card.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="rounded-[2rem] border-emerald-100 shadow-none">
            <CardHeader>
              <CardTitle className="text-xl">How the model was built</CardTitle>
              <CardDescription>User-friendly explanation of the logic behind the numbers</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm leading-6 text-slate-600">
              {[
                'Plastic value is kept modest at Tk 22 per kilogram to avoid overstating recovery income.',
                'Sponsor income starts small and becomes bundled at scale, so per-booth sponsor revenue falls as the network grows.',
                'Operating cost does not rise in direct proportion to booth count, because one team can manage more booths as routes and maintenance become more efficient.',
                'Scale-up requires new capital investment, but part of that is offset by one-time sponsor activation support.',
                'The full model includes setup cost, recurring monthly cost, recurring sponsor contracts, one-time sponsor support, and plastic recovery value.',
              ].map((text) => (
                <div key={text} className="flex gap-3 rounded-2xl bg-emerald-50/60 p-4">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>{text}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="min-w-0 rounded-[2rem] border-sky-100 shadow-none">
            <CardHeader>
              <CardTitle className="text-xl">Visual cashflow trend</CardTitle>
              <CardDescription>Monthly net cashflow and cumulative position over 24 months</CardDescription>
            </CardHeader>
            <CardContent className="h-[280px] sm:h-[340px] p-2 sm:p-4">
              <div className="h-full w-full min-w-0 min-h-[264px]">
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={264}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip formatter={(value) => currency(value)} />
                      <Legend />
                      <Line type="monotone" dataKey="net" stroke="#10b981" strokeWidth={3} dot={false} name="Monthly net cashflow" />
                      <Line type="monotone" dataKey="cumulative" stroke="#0f172a" strokeWidth={3} dot={false} name="Cumulative cashflow" />
                    </LineChart>
                  </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <Card className="rounded-[2rem] border-emerald-100 shadow-none">
            <CardHeader>
              <CardTitle className="text-xl">Assumptions table</CardTitle>
              <CardDescription>Every core input used in the model</CardDescription>
            </CardHeader>
            <CardContent className="overflow-hidden">
              <div className="grid gap-3 md:hidden">
                {mobileAssumptions.map((row) => (
                  <div key={`${row.category}-${row.item}`} className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4 shadow-sm">
                    <div className="text-xs font-medium uppercase tracking-wide text-emerald-700">{row.category}</div>
                    <div className="mt-1 text-sm font-semibold text-slate-900">{row.item}</div>
                    <div className="mt-2 text-sm text-emerald-700">{row.value}</div>
                    <div className="mt-2 text-xs leading-5 text-slate-600">{row.why}</div>
                  </div>
                ))}
              </div>
              <div className="max-w-full overflow-x-auto overscroll-x-contain rounded-2xl border border-emerald-100" style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x pan-y' }}>
                <table className="hidden min-w-[760px] md:table md:min-w-full table-auto text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-emerald-100 text-slate-500">
                      <th className="px-2 py-2 font-medium whitespace-nowrap">Category</th>
                      <th className="px-2 py-2 font-medium whitespace-nowrap">Item</th>
                      <th className="px-2 py-2 font-medium whitespace-nowrap">Value used</th>
                      <th className="px-2 py-2 font-medium whitespace-nowrap">Why</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assumptions.map((row) => (
                      <tr key={row.item} className="border-b border-slate-100 align-top">
                        <td className="px-2 py-2 text-slate-500">{row.category}</td>
                        <td className="px-2 py-2 font-medium text-slate-900">{row.item}</td>
                        <td className="px-2 py-2 text-emerald-700">{row.value}</td>
                        <td className="px-2 py-2 text-slate-600">{row.why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="min-w-0 rounded-[2rem] border-sky-100 shadow-none">
            <CardHeader>
              <CardTitle className="text-xl">Revenue mix by month</CardTitle>
              <CardDescription>How sponsor revenue and plastic revenue combine over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[280px] sm:h-[400px] p-2 sm:p-4">
              <div className="h-full w-full min-w-0 min-h-[264px]">
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={264}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip formatter={(value) => currency(value)} />
                      <Legend />
                      <Bar dataKey="plasticRevenue" stackId="a" fill="#10b981" name="Plastic revenue" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="sponsorRecurring" stackId="a" fill="#0ea5e9" name="Sponsor recurring" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <Card className="rounded-[2rem] border-emerald-100 shadow-none">
            <CardHeader>
              <CardTitle className="text-xl">Initial and expansion cost breakdown</CardTitle>
              <CardDescription>Capital cost is separated so users can see setup burden clearly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-3 sm:p-6">
              <div>
                <div className="mb-3 text-sm font-medium text-slate-500">Initial setup</div>
                <div className="grid gap-3 md:hidden">
                  {mobileInitialCostBreakdown.map((row) => (
                    <div key={row.item} className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
                      <div className="text-sm font-semibold text-slate-900">{row.item}</div>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-slate-600">
                        <div><span className="font-medium text-slate-500">Unit:</span> {row.unit}</div>
                        <div><span className="font-medium text-slate-500">Qty:</span> {row.qty}</div>
                        <div><span className="font-medium text-slate-500">Total:</span> {currency(row.total)}</div>
                        <div className="text-emerald-700"><span className="font-medium text-slate-500">Why:</span> {row.note}</div>
                      </div>
                    </div>
                  ))}
                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 text-sm font-semibold text-slate-900">
                    Initial setup total: <span className="text-emerald-700">{currency(88000)}</span>
                  </div>
                </div>
                <div className="overflow-x-auto overscroll-x-contain">
                  <table className="hidden min-w-[760px] md:table md:min-w-full table-auto text-left text-sm">
                    <thead>
                      <tr className="border-b border-emerald-100 text-slate-500">
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Item</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Unit</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Qty</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Total</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Why</th>
                      </tr>
                    </thead>
                    <tbody>
                      {initialCostBreakdown.map((row) => (
                        <tr key={row.item} className="border-b border-slate-100 align-top">
                          <td className="px-2 py-2 font-medium text-slate-900">{row.item}</td>
                          <td className="px-2 py-2">{row.unit}</td>
                          <td className="px-2 py-2">{row.qty}</td>
                          <td className="px-2 py-2 text-emerald-700">{currency(row.total)}</td>
                          <td className="px-2 py-2 text-slate-600">{row.note}</td>
                        </tr>
                      ))}
                      <tr className="bg-emerald-50/60 font-semibold text-slate-900">
                        <td className="px-3 py-3" colSpan={3}>Initial setup total</td>
                        <td className="px-2 py-2 text-emerald-700">{currency(88000)}</td>
                        <td className="px-2 py-2">Month 0 capex</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <div className="mb-3 text-sm font-medium text-slate-500">Expansion stages</div>
                <div className="grid gap-3 md:hidden">
                  {mobileExpansionCostBreakdown.map((row) => (
                    <div key={row.stage} className="rounded-2xl border border-sky-100 bg-white p-4 shadow-sm">
                      <div className="text-sm font-semibold text-slate-900">{row.stage}</div>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-slate-600">
                        <div><span className="font-medium text-slate-500">Gross:</span> {currency(row.gross)}</div>
                        <div><span className="font-medium text-slate-500">Support:</span> {currency(row.support)}</div>
                        <div><span className="font-medium text-slate-500">Net:</span> {currency(row.net)}</div>
                        <div className="text-slate-600"><span className="font-medium text-slate-500">Note:</span> {row.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="overflow-x-auto overscroll-x-contain">
                  <table className="hidden min-w-[860px] md:table md:min-w-full table-auto text-left text-sm">
                    <thead>
                      <tr className="border-b border-sky-100 text-slate-500">
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Stage</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Gross capex</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Sponsor setup support</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Net capex burden</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expansionCostBreakdown.map((row) => (
                        <tr key={row.stage} className="border-b border-slate-100 align-top">
                          <td className="px-2 py-2 font-medium text-slate-900">{row.stage}</td>
                          <td className="px-2 py-2">{currency(row.gross)}</td>
                          <td className="px-2 py-2 text-sky-700">{currency(row.support)}</td>
                          <td className="px-2 py-2 text-emerald-700">{currency(row.net)}</td>
                          <td className="px-2 py-2 text-slate-600">{row.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-slate-200 shadow-none">
            <CardHeader>
              <CardTitle className="text-xl">Cost and income breakdown by stage</CardTitle>
              <CardDescription>Simple tables users can read without financial background</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-3 sm:p-6">
              <div>
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-500"><Truck className="h-4 w-4" /> Monthly operating cost</div>
                <div className="grid gap-3 md:hidden">
                  {mobileOpexBreakdown.map((row) => (
                    <div key={row.stage} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="text-sm font-semibold text-slate-900">{row.stage}</div>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-slate-600">
                        <div><span className="font-medium text-slate-500">Operator:</span> {currency(row.operator)}</div>
                        <div><span className="font-medium text-slate-500">Transport:</span> {currency(row.transport)}</div>
                        <div><span className="font-medium text-slate-500">Maintenance:</span> {currency(row.maintenance)}</div>
                        <div><span className="font-medium text-slate-500">Misc:</span> {currency(row.misc)}</div>
                        <div><span className="font-medium text-slate-500">Total:</span> {currency(row.total)}</div>
                        <div><span className="font-medium text-slate-500">Per booth:</span> {currency(row.perBooth)}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="overflow-x-auto overscroll-x-contain">
                  <table className="hidden min-w-[980px] md:table md:min-w-full table-auto text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500">
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Stage</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Operator</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Transport</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Maintenance</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Misc</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Total</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Per booth</th>
                      </tr>
                    </thead>
                    <tbody>
                      {opexBreakdown.map((row) => (
                        <tr key={row.stage} className="border-b border-slate-100">
                          <td className="px-2 py-2 font-medium text-slate-900">{row.stage}</td>
                          <td className="px-2 py-2">{currency(row.operator)}</td>
                          <td className="px-2 py-2">{currency(row.transport)}</td>
                          <td className="px-2 py-2">{currency(row.maintenance)}</td>
                          <td className="px-2 py-2">{currency(row.misc)}</td>
                          <td className="px-2 py-2 text-emerald-700">{currency(row.total)}</td>
                          <td className="px-2 py-2 text-slate-500">{currency(row.perBooth)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-500"><Landmark className="h-4 w-4" /> Sponsor income</div>
                <div className="grid gap-3 md:hidden">
                  {mobileSponsorBreakdown.map((row) => (
                    <div key={row.stage} className="rounded-2xl border border-sky-100 bg-white p-4 shadow-sm">
                      <div className="text-sm font-semibold text-slate-900">{row.stage}</div>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-slate-600">
                        <div><span className="font-medium text-slate-500">Booths:</span> {row.booths}</div>
                        <div><span className="font-medium text-slate-500">Monthly income:</span> {currency(row.total)}</div>
                        <div><span className="font-medium text-slate-500">Per booth:</span> {currency(row.perBooth)}</div>
                        <div><span className="font-medium text-slate-500">Type:</span> {row.type}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="overflow-x-auto overscroll-x-contain">
                  <table className="hidden min-w-[900px] md:table md:min-w-full table-auto text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500">
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Stage</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Booths</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Monthly sponsor income</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Per booth equivalent</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Contract type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sponsorBreakdown.map((row) => (
                        <tr key={row.stage} className="border-b border-slate-100">
                          <td className="px-2 py-2 font-medium text-slate-900">{row.stage}</td>
                          <td className="px-2 py-2">{row.booths}</td>
                          <td className="px-2 py-2 text-sky-700">{currency(row.total)}</td>
                          <td className="px-2 py-2">{currency(row.perBooth)}</td>
                          <td className="px-2 py-2 text-slate-600">{row.type}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-500"><Recycle className="h-4 w-4" /> Plastic revenue formula</div>
                <div className="grid gap-3 md:hidden">
                  {mobilePlasticFormulaRows.map((row) => (
                    <div key={row.stage} className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
                      <div className="text-sm font-semibold text-slate-900">{row.stage}</div>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-slate-600">
                        <div><span className="font-medium text-slate-500">Booths:</span> {row.booths}</div>
                        <div><span className="font-medium text-slate-500">Kg/day:</span> {row.rate}</div>
                        <div><span className="font-medium text-slate-500">Monthly kg:</span> {row.monthlyKg}</div>
                        <div><span className="font-medium text-slate-500">Price/kg:</span> Tk {row.price}</div>
                        <div className="col-span-2"><span className="font-medium text-slate-500">Revenue:</span> {currency(row.revenue)}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="overflow-x-auto overscroll-x-contain">
                  <table className="hidden min-w-[860px] md:table md:min-w-full table-auto text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500">
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Stage</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Booths</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Kg/day/booth</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Monthly kg</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Price/kg</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Monthly revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {plasticFormulaRows.map((row) => (
                        <tr key={row.stage} className="border-b border-slate-100">
                          <td className="px-2 py-2 font-medium text-slate-900">{row.stage}</td>
                          <td className="px-2 py-2">{row.booths}</td>
                          <td className="px-2 py-2">{row.rate}</td>
                          <td className="px-2 py-2">{row.monthlyKg}</td>
                          <td className="px-2 py-2">Tk {row.price}</td>
                          <td className="px-2 py-2 text-emerald-700">{currency(row.revenue)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6">
          <Card className="rounded-[2rem] border-emerald-100 shadow-none">
            <CardHeader>
              <CardTitle className="text-xl">Month-by-month 24-month cashflow</CardTitle>
              <CardDescription>Full breakdown including setup, scale-up, recurring income, and cumulative position</CardDescription>
            </CardHeader>
            <CardContent className="overflow-hidden p-3 sm:p-6">
              <p className="mb-2 text-xs text-slate-500 md:hidden">Swipe left/right to view all columns</p>
              <div className="md:hidden">
                <MobileHorizontalScroll className="rounded-2xl border border-emerald-100" contentClassName="w-max min-w-[1180px]">
                    <table className="w-max min-w-[1180px] table-auto text-left text-[11px]">
                    <thead className="sticky top-0 bg-white">
                      <tr className="border-b border-emerald-100 text-slate-500">
                        {['Month', 'Phase', 'Booths', 'Kg/day/booth', 'Monthly kg', 'Plastic revenue', 'Sponsor recurring', 'Sponsor support', 'Total inflow', 'Opex', 'Capex', 'Net', 'Cumulative'].map((h) => (
                          <th key={h} className="px-2 py-3 font-medium whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {monthlyRows.map((row) => (
                        <tr key={row.month} className={`border-b border-slate-100 ${row.month === 23 ? 'bg-emerald-50/70' : row.phase === 'Scale 2' ? 'bg-sky-50/25' : row.phase === 'Scale 1' ? 'bg-violet-50/25' : ''}`}>
                          <td className="px-2 py-2 font-medium text-slate-900 whitespace-nowrap">{row.month}</td>
                          <td className="px-2 py-2 text-slate-500 whitespace-nowrap">{row.phase}</td>
                          <td className="px-2 py-2 whitespace-nowrap">{row.booths}</td>
                          <td className="px-2 py-2 whitespace-nowrap">{row.kgDay}</td>
                          <td className="px-2 py-2 whitespace-nowrap">{row.plasticKg.toLocaleString()}</td>
                          <td className="px-2 py-2 whitespace-nowrap">{currency(row.plasticRevenue)}</td>
                          <td className="px-2 py-2 whitespace-nowrap">{currency(row.sponsorRecurring)}</td>
                          <td className="px-2 py-2 whitespace-nowrap">{currency(row.sponsorSupport)}</td>
                          <td className="px-2 py-2 font-medium text-slate-900 whitespace-nowrap">{currency(row.inflow)}</td>
                          <td className="px-2 py-2 whitespace-nowrap">{currency(row.opex)}</td>
                          <td className="px-2 py-2 whitespace-nowrap">{currency(row.capex)}</td>
                          <td className={`px-2 py-2 font-medium whitespace-nowrap ${row.net >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>{currency(row.net)}</td>
                          <td className={`px-2 py-2 font-medium whitespace-nowrap ${row.cumulative >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>{currency(row.cumulative)}</td>
                        </tr>
                      ))}
                    </tbody>
                    </table>
                </MobileHorizontalScroll>
              </div>
              <div className="hidden md:block">
                <div className="max-h-[520px] max-w-full overflow-x-auto overflow-y-auto overscroll-x-contain rounded-2xl border border-emerald-100" style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x pan-y' }}>
                  <table className="min-w-[980px] 2xl:min-w-full table-auto text-left text-[12px] sm:text-[13px]">
                    <thead className="sticky top-0 bg-white">
                      <tr className="border-b border-emerald-100 text-slate-500">
                        {['Month', 'Phase', 'Booths', 'Kg/day/booth', 'Monthly kg', 'Plastic revenue', 'Sponsor recurring', 'Sponsor support', 'Total inflow', 'Opex', 'Capex', 'Net', 'Cumulative'].map((h) => (
                          <th key={h} className="px-3 py-3 font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {monthlyRows.map((row) => (
                        <tr key={row.month} className={`border-b border-slate-100 ${row.month === 23 ? 'bg-emerald-50/70' : row.phase === 'Scale 2' ? 'bg-sky-50/25' : row.phase === 'Scale 1' ? 'bg-violet-50/25' : ''}`}>
                          <td className="px-2 py-2 font-medium text-slate-900 md:sticky md:left-0 md:z-10 md:bg-white md:shadow-[1px_0_0_0_rgba(226,232,240,1)]">{row.month}</td>
                          <td className="px-2 py-2 text-slate-500 md:sticky md:left-[48px] md:z-10 md:bg-white md:shadow-[1px_0_0_0_rgba(226,232,240,1)]">{row.phase}</td>
                          <td className="px-2 py-2">{row.booths}</td>
                          <td className="px-2 py-2">{row.kgDay}</td>
                          <td className="px-2 py-2">{row.plasticKg.toLocaleString()}</td>
                          <td className="px-2 py-2">{currency(row.plasticRevenue)}</td>
                          <td className="px-2 py-2">{currency(row.sponsorRecurring)}</td>
                          <td className="px-2 py-2">{currency(row.sponsorSupport)}</td>
                          <td className="px-2 py-2 font-medium text-slate-900">{currency(row.inflow)}</td>
                          <td className="px-2 py-2">{currency(row.opex)}</td>
                          <td className="px-2 py-2">{currency(row.capex)}</td>
                          <td className={`px-2 py-2 font-medium ${row.net >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>{currency(row.net)}</td>
                          <td className={`px-2 py-2 font-medium ${row.cumulative >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>{currency(row.cumulative)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-emerald-100 shadow-none">
            <CardHeader>
              <CardTitle className="text-xl">Phase summary</CardTitle>
              <CardDescription>Easy summary view for sponsors and reviewers</CardDescription>
            </CardHeader>
            <CardContent className="overflow-hidden p-3 sm:p-6">
              <p className="mb-2 text-xs text-slate-500 md:hidden">Swipe left/right to view all columns</p>
              <div className="md:hidden">
                <MobileHorizontalScroll className="rounded-2xl border border-emerald-100" contentClassName="w-max min-w-[1020px]">
                    <table className="w-max min-w-[1020px] table-auto text-left text-xs">
                    <thead>
                      <tr className="border-b border-emerald-100 text-slate-500">
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Phase</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Period</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Booths</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Plastic revenue</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Sponsor recurring</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Sponsor support</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Opex</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Capex</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Net</th>
                      </tr>
                    </thead>
                    <tbody>
                      {phaseSummary.map((row) => (
                        <tr key={row.phase} className="border-b border-slate-100">
                          <td className="px-2 py-2 font-medium text-slate-900 whitespace-nowrap">{row.phase}</td>
                          <td className="px-2 py-2 whitespace-nowrap">{row.period}</td>
                          <td className="px-2 py-2 whitespace-nowrap">{row.booths}</td>
                          <td className="px-2 py-2 whitespace-nowrap">{currency(row.plasticRevenue)}</td>
                          <td className="px-2 py-2 whitespace-nowrap">{currency(row.sponsorRecurring)}</td>
                          <td className="px-2 py-2 whitespace-nowrap">{currency(row.sponsorSupport)}</td>
                          <td className="px-2 py-2 whitespace-nowrap">{currency(row.opex)}</td>
                          <td className="px-2 py-2 whitespace-nowrap">{currency(row.capex)}</td>
                          <td className={`px-2 py-2 font-medium whitespace-nowrap ${row.net >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>{currency(row.net)}</td>
                        </tr>
                      ))}
                      <tr className="bg-emerald-50/70 font-semibold text-slate-900">
                        <td className="px-3 py-3 whitespace-nowrap" colSpan={3}>Total over 24 months</td>
                        <td className="px-2 py-2 whitespace-nowrap">{currency(385704)}</td>
                        <td className="px-2 py-2 whitespace-nowrap">{currency(441000)}</td>
                        <td className="px-2 py-2 whitespace-nowrap">{currency(160000)}</td>
                        <td className="px-2 py-2 whitespace-nowrap">{currency(411000)}</td>
                        <td className="px-2 py-2 whitespace-nowrap">{currency(540000)}</td>
                        <td className="px-2 py-2 text-emerald-700 whitespace-nowrap">{currency(35704)}</td>
                      </tr>
                    </tbody>
                    </table>
                </MobileHorizontalScroll>
              </div>
              <div className="hidden md:block">
                <div className="max-w-full overflow-x-auto overflow-y-hidden overscroll-x-contain rounded-2xl border border-emerald-100" style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x pan-y' }}>
                  <table className="min-w-[1020px] xl:min-w-full table-auto text-left text-sm">
                    <thead>
                      <tr className="border-b border-emerald-100 text-slate-500">
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Phase</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Period</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Booths</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Plastic revenue</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Sponsor recurring</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Sponsor support</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Opex</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Capex</th>
                        <th className="px-2 py-2 font-medium whitespace-nowrap">Net</th>
                      </tr>
                    </thead>
                    <tbody>
                      {phaseSummary.map((row) => (
                        <tr key={row.phase} className="border-b border-slate-100">
                          <td className="px-2 py-2 font-medium text-slate-900">{row.phase}</td>
                          <td className="px-2 py-2">{row.period}</td>
                          <td className="px-2 py-2">{row.booths}</td>
                          <td className="px-2 py-2">{currency(row.plasticRevenue)}</td>
                          <td className="px-2 py-2">{currency(row.sponsorRecurring)}</td>
                          <td className="px-2 py-2">{currency(row.sponsorSupport)}</td>
                          <td className="px-2 py-2">{currency(row.opex)}</td>
                          <td className="px-2 py-2">{currency(row.capex)}</td>
                          <td className={`px-2 py-2 font-medium ${row.net >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>{currency(row.net)}</td>
                        </tr>
                      ))}
                      <tr className="bg-emerald-50/70 font-semibold text-slate-900">
                        <td className="px-3 py-3" colSpan={3}>Total over 24 months</td>
                        <td className="px-2 py-2">{currency(385704)}</td>
                        <td className="px-2 py-2">{currency(441000)}</td>
                        <td className="px-2 py-2">{currency(160000)}</td>
                        <td className="px-2 py-2">{currency(411000)}</td>
                        <td className="px-2 py-2">{currency(540000)}</td>
                        <td className="px-2 py-2 text-emerald-700">{currency(35704)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            <Card className="rounded-[2rem] border-sky-100 shadow-none">
              <CardHeader>
                <CardTitle className="text-xl">Inflow vs cost by month</CardTitle>
                <CardDescription>Shows how sponsor income and plastic revenue compare against monthly opex and capex</CardDescription>
              </CardHeader>
              <CardContent className="h-[220px] overflow-hidden p-2 sm:h-[280px] sm:p-4">
                  {isMobileView ? (
                  <MobileHorizontalScroll className="h-full rounded-2xl" contentClassName="h-full w-max min-w-[920px] min-h-[204px]">
                      <ResponsiveContainer width="100%" height="100%" minWidth={920} minHeight={204}>
                        <AreaChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                          <YAxis tick={{ fontSize: 12 }} />
                          <Tooltip formatter={(value) => currency(value)} />
                          <Legend />
                          <Area type="monotone" dataKey="plasticRevenue" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Plastic revenue" />
                          <Area type="monotone" dataKey="sponsorRecurring" stackId="1" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.6} name="Sponsor recurring" />
                          <Line type="monotone" dataKey="opex" stroke="#0f172a" strokeWidth={2} dot={false} name="Monthly opex" />
                          <Line type="monotone" dataKey="capex" stroke="#ef4444" strokeWidth={2} dot={false} name="Capex spike" />
                        </AreaChart>
                      </ResponsiveContainer>
                  </MobileHorizontalScroll>
                  ) : (
                  <div className="h-full w-full min-w-0 min-h-[204px]">
                    <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={204}>
                      <AreaChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip formatter={(value) => currency(value)} />
                        <Legend />
                        <Area type="monotone" dataKey="plasticRevenue" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Plastic revenue" />
                        <Area type="monotone" dataKey="sponsorRecurring" stackId="1" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.6} name="Sponsor recurring" />
                        <Line type="monotone" dataKey="opex" stroke="#0f172a" strokeWidth={2} dot={false} name="Monthly opex" />
                        <Line type="monotone" dataKey="capex" stroke="#ef4444" strokeWidth={2} dot={false} name="Capex spike" />
                      </AreaChart>
                    </ResponsiveContainer>
                </div>
                  )}
              </CardContent>
            </Card>

          </div>
        </div>
      </motion.div>
    </div>
  );
}

function TeamPage() {
  const members = [
    'MD Maruf Ahmed',
    'Mahedi Mostafa Rifat',
    'Mayesha Ann-Noor Nishma',
    'Mir Sajid Hussain',
  ];

  return (
    <div className="mx-auto w-full max-w-[1800px] overflow-x-hidden px-3 py-10 sm:px-4 lg:px-5 md:py-14">
      <motion.div variants={sectionFade} initial="hidden" animate="show" className="space-y-8">
        <div className="space-y-3">
          <Badge className="rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Team</Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Team EcoChange Makers</h1>
          <p className="max-w-4xl text-base leading-7 text-slate-600">
            This project was developed by Team EcoChange Makers as a practical, sponsor-aware, and behavior-driven response to the plastic waste challenge in Cox’s Bazar.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {members.map((name) => (
            <Card key={name} className="rounded-3xl border-emerald-100 shadow-none">
              <CardContent className="flex min-h-[160px] flex-col justify-end p-6">
                <div className="mb-4 h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-sky-500" />
                <div className="text-lg font-semibold text-slate-900">{name}</div>
                <div className="text-sm text-slate-500">Team EcoChange Makers</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="rounded-[2rem] border-sky-100 shadow-none">
          <CardHeader>
            <CardTitle className="text-xl">Project values</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-4">
            {['Practical thinking', 'System improvement', 'Behavior change', 'Long-term sustainability'].map((v) => (
              <div key={v} className="rounded-2xl bg-sky-50/70 p-4 text-sm text-slate-700">{v}</div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function GalleryPage() {
  const placeholders = [
    {
      title: 'Booth in front of a school',
      subtitle: 'Example image placeholder',
      note: 'Add a concept image showing students passing by and using the booth near a school entrance.',
      icon: School,
    },
    {
      title: 'Booth beside the beach',
      subtitle: 'Example image placeholder',
      note: 'Add a concept image showing the booth near a beach walkway or coastal edge in Cox’s Bazar.',
      icon: Waves,
    },
    {
      title: 'Booth on a busy roadside',
      subtitle: 'Example image placeholder',
      note: 'Add a concept image showing a visible booth on a high-footfall road with public movement nearby.',
      icon: Bus,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[1800px] overflow-x-hidden px-3 py-10 sm:px-4 lg:px-5 md:py-14">
      <motion.div variants={sectionFade} initial="hidden" animate="show" className="space-y-8">
        <div className="space-y-3">
          <Badge className="rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Booth Gallery</Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Visual concept placeholders</h1>
          <p className="max-w-4xl text-base leading-7 text-slate-600">
            This page reserves space for three example visuals showing how the Smart Plastic Drop Booth could appear in different locations.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {placeholders.map((item) => (
            <Card key={item.title} className="overflow-hidden rounded-[2rem] border-emerald-100 shadow-none">
              <div className="flex aspect-[4/3] items-center justify-center bg-[linear-gradient(135deg,rgba(16,185,129,0.12),rgba(14,165,233,0.12))]">
                <div className="flex flex-col items-center gap-3 text-center text-slate-500">
                  <item.icon className="h-10 w-10 text-emerald-600" />
                  <div className="flex items-center gap-2 text-sm"><Camera className="h-4 w-4" /> {item.subtitle}</div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.note}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function FAQPage() {
  const faqs = [
    {
      q: 'Why not just use normal bins?',
      a: 'Normal bins mix plastic with other waste. The booth creates a clear plastic-only action and supports cleaner segregation.',
    },
    {
      q: 'How will this attract people?',
      a: 'The booth is designed to be visible, easy to understand, and placed where people already move daily, such as schools and busy roads.',
    },
    {
      q: 'Why is this better than a one-time awareness campaign?',
      a: 'Because it creates a system that remains in place and can shape repeated daily behavior instead of relying on memory or one-off events.',
    },
    {
      q: 'How is it financially sustainable?',
      a: 'Through a combination of bundled sponsor contracts and plastic recovery value, with cost per booth falling as the network grows.',
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[1800px] overflow-x-hidden px-3 py-10 sm:px-4 lg:px-5 md:py-14">
      <motion.div variants={sectionFade} initial="hidden" animate="show" className="space-y-8">
        <div className="space-y-3">
          <Badge className="rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-100">FAQ</Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Questions people may ask</h1>
        </div>

        <div className="grid gap-4">
          {faqs.map((item) => (
            <Card key={item.q} className="rounded-3xl border-emerald-100 shadow-none">
              <CardContent className="p-6">
                <div className="mb-2 text-lg font-semibold text-slate-900">{item.q}</div>
                <p className="text-sm leading-6 text-slate-600">{item.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function Footer({ setCurrent }) {
  return (
    <footer className="border-t border-emerald-100 bg-white">
      <div className="mx-auto grid w-full max-w-[1800px] gap-8 px-3 py-10 sm:px-4 md:grid-cols-[1fr_auto] lg:px-5">
        <div>
          <div className="text-lg font-semibold text-slate-900">Team EcoChange Makers</div>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            A project website for the Smart Plastic Drop Booth concept, developed around plastic waste collection improvement in Cox’s Bazar in collaboration with BRAC UDP.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {pages.map((p) => (
            <Button key={p.id} variant="ghost" onClick={() => setCurrent(p.id)} className="rounded-full text-slate-600 hover:bg-emerald-50 hover:text-emerald-700">
              {p.label}
            </Button>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function ProjectWebsite() {
  const [current, setCurrent] = useState('home');

  const page = useMemo(() => {
    switch (current) {
      case 'home':
        return <HomePage setCurrent={setCurrent} />;
      case 'problem':
        return <ProblemPage />;
      case 'solution':
        return <SolutionPage />;
      case 'plan':
        return <PlanPage />;
      case 'outcome':
        return <OutcomePage />;
      case 'finance':
        return <FinancePage />;
      case 'team':
        return <TeamPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'faq':
        return <FAQPage />;
      default:
        return <HomePage setCurrent={setCurrent} />;
    }
  }, [current]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[linear-gradient(to_bottom,white,rgba(236,253,245,0.35),white)] text-slate-900">
      <Nav current={current} setCurrent={setCurrent} />
      <main className="pt-[76px] md:pt-0">{page}</main>
      <Separator className="bg-transparent" />
      <section className="mx-auto w-full max-w-[1800px] px-3 py-6 sm:px-4 lg:px-5">
        <div className="rounded-[2rem] border border-emerald-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="text-sm font-medium text-emerald-700">Project highlights</div>
              <div className="mt-1 text-lg font-semibold text-slate-900">Practical. Visible. Scalable. Sponsor-aware.</div>
            </div>
            <Button onClick={() => setCurrent('gallery')} className="rounded-full bg-slate-900 px-5 hover:bg-slate-800">
              View booth placeholders <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      <Footer setCurrent={setCurrent} />
    </div>
  );
}
