/* October 30–November 29, 2026. Exact plans and suggested targets stay distinct. */
(() => {
  const root = document.getElementById('ignite-plan');
  if (!root) return;
  const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const check = (id, text) => `<label class="ignite-check"><input type="checkbox" data-ignite-check="${escape(id)}"><span>${escape(text)}</span></label>`;
  const tracks = [
    ['a', 'Ignite · primary focus', ['Build the super skill → plugin demo for Nov 17.', 'Orchestrate + instrument tools, MCPs, and plugins.', 'Show the crawl / walk / run intent-routing roadmap.']],
    ['b', 'AirLift · Nov 2–5', ['Align messaging + demo with Matthew and Rishab.', 'Deliver the internal MVP co-speaker session Nov 5.']],
    ['c', 'ObsCon · close the loop', ['Nov 2: email the learnings and what I demo’d on stage.']],
    ['d', 'Semantic analysis', ['Research the market and competing experiences.', 'Turn findings into intent-routing hypotheses. Innovator mode on.']],
    ['e', 'Bangladesh + bride', ['Book Bangladesh tickets after Nov 15.', 'Plan cousin’s bride makeup purchases + spending.']],
    ['f', 'AMG + Helios strategy', ['Close engineering, business, and partnership threads.', 'Keep leadership metrics + state-of-business slides current.']],
    ['g', 'Documentation', ['Nov 9: submit all super skill plugin docs.', 'Progress exemplars, 1P Prometheus, and Metrics Data Plane API docs.']],
    ['h', 'Customer onboarding', ['Nov 3, 11:30 am: onboarding follow-up.', 'Keep customer follow-ups and onboarding blockers moving.']]
  ];
  document.getElementById('ignite-focus-grid').innerHTML = tracks.map(([id, title, tasks]) => `<article class="ignite-focus-card"><header><span>${id.toUpperCase()}.</span><h3>${escape(title)}</h3></header>${tasks.map((text, index) => check(`focus-${id}-${index}`, text)).join('')}</article>`).join('');
  document.getElementById('ignite-life-tasks').innerHTML = [
    'Book Bangladesh tickets; confirm dates, fare, and baggage.',
    'Shop makeup for cousin’s bride; track expenditure against the agreed budget.',
    'Schedule lip neutralization retouch appointment.',
    'Get nails done; book a slot around the demo.'
  ].map((text, index) => check(`after-nov15-${index}`, text)).join('');

  const day = (date, title, badge, slots, proposed = '', key = false) => ({ date, title, badge, slots, proposed, key });
  const launch = [
    day('2026-10-30', 'Friday · Back in build mode', 'Demo + a Friday night to self', [
      ['10 am', 'Wake up.'], ['11 am', 'Shiva top-of-mind meeting · share repo updates.'], ['Noon', 'Matcha.'], ['1–2 pm', 'Pilates.'], ['2 pm', 'Lunch · maybe take the laptop to review AirLift messaging.'], ['3–8 pm', 'Continue demo work; catch up on SAT prep for Juju, my little baby.'], ['8 pm', 'Nap.'], ['9 pm onward', 'Deep clean the apartment. Friday night to self — girl apartment moment hihi.']
    ]),
    day('2026-10-31', 'Saturday · Halloween!', 'Halloowwweeeeeeeen!!!!', [['Afternoon?', 'Call Anne at Aube to ask about a bang trim. Appointment not confirmed.'], ['Evening', 'Halloween. Keep room for fun.']]),
    day('2026-11-01', 'Sunday · Family + Hassan', 'A soft start', [['11 am', 'Late wake-up; send remittance for family.'], ['Noon–1 pm', 'Pilates.'], ['After Pilates', 'Lunch.'], ['Later', 'Plan to meet Hassan. Show him GitHub Copilot + edit his resume.'], ['Evening', 'If he stays, chill with him. If not, work on super skill → plugin.']])
  ];
  const firstWeek = [
    day('2026-11-02', 'Monday · Close loops', 'AirLift week begins', [['8 am', 'Wake up, matcha, skincare. Send the ObsCon review email: learnings + what I demo’d on stage.'], ['9 am', 'Email + Teams replies; metrics and state-of-business slide updates for all products.'], ['11 am', 'Azure Monitor standup.'], ['Until noon', 'WFH · AMG and Helios engineering + business work.'], ['Noon', 'Get ready and head to the office.'], ['Afternoon', 'Wrap AMG partnership and customer follow-ups.'], ['3–4 pm', 'Engineering syncs as usual.'], ['4 pm', 'Continue the super skill plugin.'], ['6 pm', 'Mall sushi. Come home and sleep early.']]),
    day('2026-11-03', 'Tuesday · Demo + leadership', 'Make the commitments clear', [['7 am', 'Wake up.'], ['8 am', 'Grafana Labs sync.'], ['9:30 am onward', 'AirLift demo work with Matthew and Rishab.'], ['11:30 am', 'Customer onboarding follow-up.'], ['Noon–3 pm', 'Go to the office and finish all demo work.'], ['3 pm', 'Manager 1:1 · walk through everything ready and what can be committed to the VP and president.'], ['3:30 pm', 'AMG PM / engineering sync · flag engineering issues.'], ['4 pm', 'Shiproom deck update · flag dynamic dashboard.'], ['After work', 'Go get nails done, baby. Home, dinner, sleep early.']]),
    day('2026-11-04', 'Wednesday · Confirm the demo', 'Docs deadline: Nov 9', [['9 am', 'Wake up.'], ['10 am', 'Shiproom.'], ['11 am', 'Azure Monitor standup.'], ['Noon', 'Work with April on usage telemetry supportability.'], ['1–2 pm', 'Nap.'], ['2 pm onward', 'Confirm AirLift demo; continue the super skill for the Nov 9 docs deadline.'], ['7–8 pm', 'Pilates.'], ['After Pilates', 'Home, shower, get ready.'], ['9 pm', 'Clough Club: hotdog, rosemary fries, and an Army & Navy <3.']]),
    day('2026-11-05', 'Thursday · AirLift stage', 'Co-speaker session · MVPs', [['Morning', 'Slow wake-up. Work on the super skill + AirLift demo all morning.'], ['1–2 pm', 'Host AMG + Helios office hours.'], ['2:45–4 pm', 'AirLift co-speaker session.'], ['Afterward', 'Come home early, clean, night with Hassan.']], '', true),
    day('2026-11-06', 'Friday · Ignite, heads down', 'No AirLift carryover', [['Morning', 'Slow wake-up.'], ['Workday', 'Heads-down Ignite work.'], ['Evening', 'Chores night.']]),
    day('2026-11-07', 'Saturday · Rest is the plan', 'Reset + relax', [['Today', 'Rest, reset, relax.'], ['Maybe', 'A day at the bookstore or a night at Guilt & Co. with Hassan.']]),
    day('2026-11-08', 'Sunday · Plugin crunch', 'Juju + a focused evening', [['Before evening', 'Try to book Pilates; Juju SAT prep check-in.'], ['All evening', 'Final crunch for the Ignite super skill + plugin docs.']]),
    day('2026-11-09', 'Monday · Submit the docs', 'Hard deadline · super skill plugin', [['8 am', 'Wake up, matcha, skincare.'], ['9 am', 'Email + Teams; refresh metrics and state-of-business slides.'], ['11 am', 'Azure Monitor standup.'], ['Workday', 'Submit all super skill plugin docs today. Continue AMG + Helios engineering, business, partnership, and customer follow-ups.'], ['Noon', 'Get ready for the office.'], ['3–4 pm', 'Engineering syncs.'], ['4 pm onward', 'Continue the super skill plugin after submission.'], ['Evening', 'Mall sushi; home and early sleep.']], 'Suggested submission check: setup, permissions, instrumentation, golden path, known limitations, and recovery steps. Confirm receipt.', true)
  ];
  const finalWeek = [
    day('2026-11-10', 'Tuesday · Prove the journey', 'Usual Tuesday cadence · no AirLift', [['7 am', 'Wake up.'], ['8 am', 'Grafana Labs sync.'], ['9:30 am–3 pm', 'Ignite super skill / plugin work; office from noon.'], ['11:30 am', 'Customer onboarding follow-up cadence.'], ['3 pm', 'Manager 1:1 · readiness + leadership commitments.'], ['3:30 pm', 'AMG PM / engineering sync · flag issues.'], ['4 pm', 'Shiproom deck update · dynamic dashboard.'], ['Evening', 'Dinner, early sleep.']], 'Validate one complete tool / MCP / plugin journey, including correlation and failure visibility.'),
    day('2026-11-11', 'Wednesday · Rehearse + refine', 'Usual Wednesday cadence', [['9 am', 'Wake up.'], ['10 am', 'Shiproom.'], ['11 am', 'Azure Monitor standup.'], ['Noon', 'Usage telemetry supportability with April.'], ['1–2 pm', 'Nap.'], ['2 pm onward', 'Ignite demo build + rehearsal.'], ['7–8 pm', 'Pilates.'], ['9 pm', 'Clough Club night after shower + getting ready.']], 'Rehearse the narrative; distinguish working capabilities from the curated intent-routing north star.'),
    day('2026-11-12', 'Thursday · Make it repeatable', 'Office hours + build', [['Morning', 'Slow wake-up; super skill / plugin work.'], ['1–2 pm', 'AMG + Helios office hours.'], ['Afternoon', 'Ignite build time in place of the completed AirLift session.'], ['Evening', 'Home early, clean, time with Hassan.']], 'Test a clean demo setup. Progress exemplars, 1P Prometheus, and Metrics Data Plane API docs; capture outstanding gaps.'),
    day('2026-11-13', 'Friday · Stabilize', 'Heads-down Ignite work', [['Morning', 'Slow wake-up.'], ['Workday', 'Ignite work, heads down.'], ['Evening', 'Chores night.']], 'Aim to freeze the golden path, record a backup, and write the recovery notes. Keep semantic research in a bounded block, not a rebuild.'),
    day('2026-11-14', 'Saturday · Protect the reset', 'Rest, reset, relax', [['Today', 'Rest. Maybe a bookstore day or Guilt & Co. with Hassan.']], 'Avoid new demo scope. Keep a small buffer only if a real blocker needs it.'),
    day('2026-11-15', 'Sunday · Final crunch', 'Juju + Pilates if booked', [['Daytime', 'Try to book Pilates; Juju SAT prep check-in.'], ['Evening', 'Final Ignite super skill work.']], 'Full end-to-end rehearsal; verify access, telemetry, backup, and recovery. Life-admin errands start after today.'),
    day('2026-11-16', 'Monday · Readiness, not reinvention', 'Usual Monday cadence · Ignite tomorrow', [['8 am', 'Wake up, matcha, skincare.'], ['9 am', 'Email + Teams; product metrics and state-of-business updates.'], ['11 am', 'Azure Monitor standup.'], ['Workday', 'AMG + Helios engineering / business; partnership + customer follow-ups.'], ['Noon', 'Get ready for the office.'], ['3–4 pm', 'Engineering syncs.'], ['4 pm onward', 'Ignite final readiness check.'], ['Evening', 'Mall sushi; home and early sleep.']], 'Run the demo once, verify the backup, and stop adding scope. Bride shopping / ticket booking can wait until after the stage if needed.'),
    day('2026-11-17', 'Tuesday · Ignite', 'The coding agent observability demo', [['Demo time TBD', 'Deliver the end-to-end journey: intent → orchestration across tools, MCPs, and plugins → correlated telemetry → insight / next action.'], ['Story', 'Show crawl / walk / run. Be explicit about what works today versus the curated intent-routing vision.'], ['Around the demo', 'Regular Tuesday work cadence continues where feasible; resolve conflicts in favor of the demo.'], ['Afterward', 'Save the demo artifacts and capture immediate feedback. Eat, rest, celebrate.']], 'Protect the stage window. Regular Tuesday syncs may need moving; demo time and any travel logistics are not yet specified.', true)
  ];
  const today = new Date();
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const dateLabel = value => new Date(`${value}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const renderDay = item => `<article class="ignite-day${item.key ? ' is-key' : ''}${item.date === todayKey ? ' is-today' : ''}"><header><time class="ignite-day-date" datetime="${item.date}">${dateLabel(item.date)}${item.date === todayKey ? ' / TODAY' : ''}</time><h4>${escape(item.title)}</h4><span class="ignite-day-badge">${escape(item.badge)}</span></header><div class="ignite-day-body">${item.slots.map(([time, text]) => `<div class="ignite-slot"><span class="ignite-slot-time">${escape(time)}</span><span class="ignite-slot-text">${escape(text)}</span></div>`).join('')}${item.proposed ? `<p class="ignite-proposed"><strong>Proposed target / planning note</strong><br>${escape(item.proposed)}</p>` : ''}</div></article>`;
  document.getElementById('ignite-schedule-grid').innerHTML = [
    ['Reset the runway', 'OCT 30 – NOV 01', launch],
    ['AirLift → plugin docs', 'NOV 02 – NOV 09', firstWeek],
    ['The final Ignite stretch', 'NOV 10 – NOV 17', finalWeek]
  ].map(([title, range, days]) => `<section class="ignite-week"><header class="ignite-week-heading"><h3>${title}</h3><span>${range}</span></header><div class="ignite-days">${days.map(renderDay).join('')}</div></section>`).join('');

  // Storage may be unavailable in private / restricted browsing; the plan still works.
  root.querySelectorAll('[data-ignite-check]').forEach(input => {
    const key = `nuzhat-ignite-2026:${input.dataset.igniteCheck}`;
    try { input.checked = localStorage.getItem(key) === '1'; } catch { /* Local-only fallback. */ }
    input.addEventListener('change', () => {
      try { localStorage.setItem(key, input.checked ? '1' : '0'); } catch { /* Keep in-memory state. */ }
    });
  });
  const returnButton = document.createElement('button');
  returnButton.className = 'ignite-return';
  returnButton.type = 'button';
  returnButton.textContent = '← Back to Ignite';
  returnButton.hidden = true;
  document.body.appendChild(returnButton);
  document.getElementById('ignite-archive').addEventListener('click', () => {
    root.hidden = true;
    document.body.classList.remove('ignite-active');
    returnButton.hidden = false;
    window.scrollTo(0, 0);
  });
  returnButton.addEventListener('click', () => {
    root.hidden = false;
    document.body.classList.add('ignite-active');
    returnButton.hidden = true;
    window.scrollTo(0, 0);
  });
})();