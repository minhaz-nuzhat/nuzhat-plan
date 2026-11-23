/* Current schedule. Exact requests, repeated rhythms, and proposed blocks stay distinct. */
(() => {
  const root = document.getElementById('current-plan');
  if (!root) return;
  const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const check = (id, text) => `<label class="ignite-check"><input type="checkbox" data-current-check="${esc(id)}"><span>${esc(text)}</span></label>`;
  const slot = (time, text, id = '') => ({time, text, id});
  const day = (date, title, slots, note = '', status = 'Planned', key = false) => ({date, title, slots, note, status, key});
  const pilatesDates = ['2026-11-25','2026-11-29','2026-12-02','2026-12-06','2026-12-09','2026-12-13','2026-12-16','2026-12-20'];
  const shortDate = value => new Date(`${value}T12:00:00`).toLocaleDateString('en-US', {month:'short',day:'numeric'});
  const weekday = value => new Date(`${value}T12:00:00`).toLocaleDateString('en-US', {weekday:'long'});
  const days = [
    day('2026-11-22','Sunday · Reset the apartment',[
      slot('3–4 pm','Dishes.'),slot('4–5 pm','Vacuum.'),slot('5–6 pm','Mop the floor.'),slot('6–7 pm','Shower.'),slot('7–8 pm','Hair care.'),slot('8–9:30 pm','Call Aunt.'),slot('10–11 pm','Dinner.'),slot('11 pm','Breka date with Hassan.')
    ],'No Pilates today; the eight-class plan starts Wednesday.'),
    day('2026-11-23','Monday · Close loops + planning',[
      slot('9 am','Wake up.'),slot('9–10 am','Send plugin contribution announcement: azd, Cowork, Azure Skills, Awesome Copilot + Canvas extension. Close the GHCP follow-up loop.'),slot('10–11 am','Respond to Grafana open threads; catch up on the Tracing ask — important.'),slot('11–11:30 am','Break.'),slot('11:30 am–noon','Onboard Azure Storage team to Helios.'),slot('Noon–12:30 pm','Azure Monitor standup.'),slot('1 pm','Head to the office; eat something.'),slot('1–3 pm','Agent observability / semantic analysis work, after arrival.'),slot('3–3:30 pm','Agent observability standup with Dash’s team.'),slot('3:30–4:30 pm','Wave 1 planning with Dash’s team.'),slot('4:30–5 pm','Grafana + Azure Monitor engineering sync. Double-check dynamic dashboard delivery timeline.'),slot('5 pm','Call Lea, wrap work; home by 7 pm.'),slot('8 pm','Book the flight with Tavleen; book dental and massage appointments.'),slot('9 pm','Quick bite.'),slot('10–10:30 pm','Wind down; in bed by 10:30 pm. Wake at 7 am.')
    ],'Office travel overlaps the start of the 1–3 pm work block. Aim for 10 pm sleep; 10:30 pm is the latest bedtime.'),
    day('2026-11-24','Tuesday · Stakeholders + Connect',[
      slot('7 am','Wake up.'),slot('7:30 am','Germany cloud solutions architects call · AMG strategy.'),slot('9 am','HorizonDB team call.'),slot('9:30 am','Grafana Labs call · timelines + expectations. Prepare for a tense meeting; flag concerns to the team.'),slot('10:30 am–noon','Nap.'),slot('After noon','Get ready; quick bite.'),slot('1 pm','Head to the office; work on Connect.'),slot('2 pm','Review plugin open threads; schedule follow-ups with each stakeholder.'),slot('3–3:30 pm','Agent observability standup with Dash’s team.'),slot('3:30–4 pm','Connect.'),slot('4 pm','Manager meeting.'),slot('4:30 pm','Grafana team meeting.'),slot('5 pm','Get nails done.'),slot('Evening','Work on Connect.'),slot('By 11 pm','In bed.')
    ]),
    day('2026-11-25','Wednesday · Test + prep for Tavleen',[
      slot('10 am','Wake up.'),slot('10 am–noon','Follow up on customer onboarding threads.'),slot('Noon','Azure Monitor standup.'),slot('1–2 pm','Head to the office.'),slot('2–3 pm','Plugin integration testing.'),slot('3–3:30 pm','Agent observability standup with Dash’s team.'),slot('3:30–5 pm','Semantic analysis · resume after standup.'),slot('5–7 pm','Plugin work for Cowork + azd.'),slot('7 pm','Head home.'),slot('Evening','Clean the apartment; prep for Tavleen’s arrival tomorrow.'),slot('Booking','Schedule all eight Pilates classes. Confirm a class today.')
    ],'The requested 3–5 pm focus block includes standup, so uninterrupted work starts at 3:30 pm. Pilates needs a confirmed slot around the office day.'),
    day('2026-11-26','Thursday · Day off with Tavleen',[
      slot('Day off','No work meetings.'),slot('Hopefully','Dental appointment · not yet confirmed.'),slot('Night','Big Way + Nadir with Tavleen.')
    ],'Confirm dental appointment time when booking.','Day off'),
    day('2026-11-27','Friday · Day off with Tavleen',[
      slot('Day off','No work meetings.'),slot('Night','Din Tai Fung + Prophecy with Tavleen.')
    ],'','Day off'),
    day('2026-11-28','Saturday · A little shopping',[
      slot('Maybe','Shopping with Tavleen; June on Cambie.')
    ],'Tentative — keep the day flexible.'),
    day('2026-11-29','Sunday · Pilates first',[
      slot('Priority','Pilates. Rest of the day stays open.')
    ])
  ];

  // Repeat Mon–Wed meeting rhythm, without repeating one-off emails, bookings or nails.
  const rhythms = {
    1: [slot('9 am','Wake up.'),slot('9–10 am','Plugin contribution + stakeholder follow-ups.'),slot('10–11 am','Grafana open threads; Tracing follow-up.'),slot('11–11:30 am','Break.'),slot('11:30 am–noon','Customer onboarding follow-ups.'),slot('Noon–12:30 pm','Azure Monitor standup.'),slot('1 pm','Head to the office; eat something.'),slot('After arrival–3 pm','Agent observability / semantic analysis.'),slot('3–3:30 pm','Agent observability standup with Dash’s team.'),slot('3:30–4:30 pm','Agent observability planning with Dash’s team.'),slot('4:30–5 pm','Grafana + Azure Monitor engineering sync; delivery timeline follow-up.'),slot('5 pm','Call Lea; wrap work; home by 7 pm.'),slot('Evening','Dinner, reset; early bedtime.')],
    2: [slot('7 am','Wake up.'),slot('7:30 am','AMG strategy follow-up with cloud solutions architects.'),slot('9 am','HorizonDB follow-up.'),slot('9:30 am','Grafana Labs sync · align timelines and expectations.'),slot('10:30 am–noon','Nap.'),slot('After noon','Get ready; quick bite.'),slot('1 pm','Office + Connect follow-ups.'),slot('2 pm','Plugin open threads + stakeholder follow-ups.'),slot('3–3:30 pm','Agent observability standup with Dash’s team.'),slot('3:30–4 pm','Connect follow-ups.'),slot('4 pm','Manager meeting.'),slot('4:30 pm','Grafana team meeting.'),slot('Evening','Dinner; focused work if needed. In bed by 11 pm.')],
    3: [slot('10 am','Wake up.'),slot('10 am–noon','Customer onboarding follow-ups.'),slot('Noon','Azure Monitor standup.'),slot('1–2 pm','Head to the office.'),slot('2–3 pm','Plugin integration testing.'),slot('3–3:30 pm','Agent observability standup with Dash’s team.'),slot('3:30–5 pm','Semantic analysis.'),slot('5–7 pm','Plugin work for Cowork + azd.'),slot('7 pm','Head home; dinner + reset.')]
  };
  for (let cursor = new Date('2026-11-30T12:00:00'); cursor <= new Date('2026-12-19T12:00:00'); cursor.setDate(cursor.getDate() + 1)) {
    const date = `${cursor.getFullYear()}-${String(cursor.getMonth()+1).padStart(2,'0')}-${String(cursor.getDate()).padStart(2,'0')}`;
    const dow = cursor.getDay();
    if (rhythms[dow]) {
      const status = date <= '2026-12-02' ? 'Repeated rhythm' : 'Proposed rhythm';
      days.push(day(date,`${weekday(date)} · ${dow === 1 ? 'Follow-ups + planning' : dow === 2 ? 'Stakeholders + Connect' : 'Testing + focus'}`,rhythms[dow].map(item => ({...item})), 'Meeting times carried forward from the first week; reconfirm recurring invites. One-off bookings and nail visits are not repeated.',status));
    } else if (dow === 4 || dow === 5) {
      days.push(day(date,`${weekday(date)} · Protected progress`,[
        slot('Proposed focus',date <= '2026-12-15' ? 'Azure Skills integration tests + Canvas release planning; keep Cowork delivery moving.' : 'Cowork delivery checks + handoff prep.'),slot('3–3:30 pm','Agent observability standup with Dash’s team.'),slot('Evening','Dinner + reset. Keep remaining time flexible.')
      ],'Only the workday standup is a specified recurring meeting. Other work blocks are proposed.','Proposed'));
    } else if (dow === 6) {
      days.push(day(date,'Saturday · Rest + life admin',[
        slot('Flexible',date <= '2026-12-15' ? 'Suggested shopping window for family gifts; rest and reset.' : 'Check travel prep and purchases. Keep the day light.')
      ],'No fixed appointments added.','Proposed'));
    } else {
      days.push(day(date,'Sunday · Pilates + reset',[
        slot('Priority','Pilates.'),slot('Flexible',date <= '2026-12-15' ? 'Rest; suggested family shopping / reset buffer.' : 'Rest and prepare for travel week.')
      ],'Class time TBD; other plans flexible.','Proposed'));
    }
  }
  days.push(
    day('2026-12-20','Sunday · Deliver + pack',[
      slot('Deadline','Deliver the observability plugin in Cowork.','deadline-cowork'),slot('Packing','Pack + weigh both checked bags: 2 × 50 lb allowance.','pack-first'),slot('Check','Verify tickets, travel documents, carry-on essentials and baggage rules.')
    ],'Pilates time TBD. Pack around the class; confirm airline limits before final weigh-in.','Deadline',true),
    day('2026-12-21','Monday · Hair, nails, final weigh-in',[
      slot('Appointment TBD','Hair appointment · $100.','expense-hair'),slot('Appointment TBD','Nail appointment · $200.','expense-nails'),slot('3–3:30 pm','Agent observability standup with Dash’s team.'),slot('Final packing','Finish packing + weigh everything: two checked bags, each no more than 50 lb.','pack-final'),slot('Work buffer','Close handoffs before OOF; move routine syncs if they conflict with appointments.')
    ],'Appointment times still need booking. Confirm each bag’s allowance with the airline.','Travel prep',true),
    day('2026-12-22','Tuesday · Lashes + ready to fly',[
      slot('Appointment TBD','Eyelash appointment · $100.','expense-lashes'),slot('3–3:30 pm','Agent observability standup with Dash’s team.'),slot('Final check','Documents, chargers, gifts, luggage weights and airport plan.'),slot('Handoff','Set OOF + remote-work expectations. Departure is tomorrow, Dec 23.'),slot('Evening','Eat, sleep, no last-minute scope.')
    ],'Lash appointment time and flight / airport departure time still TBD.','Travel prep',true)
  );
  const byDate = new Map(days.map(item => [item.date,item]));
  byDate.get('2026-12-01').slots.unshift(slot('Due today','Rent · $2,600.','expense-rent'),slot('Due today','Family remittance · $2,500.','expense-family'));
  const dec15 = byDate.get('2026-12-15');
  dec15.key = true;
  dec15.status = 'Deadline + proposed rhythm';
  dec15.slots.unshift(slot('Deadline','Deliver integration tests for the current Azure Skills plugin.','deadline-tests'),slot('Deadline','Finish the release plan for Canvas extensions: dashboards + visualizations.','deadline-canvas'),slot('Deadline','Finish shopping for family.','deadline-shopping'));
  days.forEach(item => {
    if (pilatesDates.includes(item.date)) item.slots.push(slot('Class time TBD',`Pilates · class ${pilatesDates.indexOf(item.date)+1} of 8. Mark after attending.`,`pilates-${item.date}`));
  });
  const periods = [
    {id:'reset',label:'Nov 22–29',title:'Reset + Tavleen week',start:'2026-11-22',end:'2026-11-29'},
    {id:'progress',label:'Nov 30–Dec 6',title:'Repeat the rhythm',start:'2026-11-30',end:'2026-12-06'},
    {id:'close',label:'Dec 7–13',title:'Make room for delivery',start:'2026-12-07',end:'2026-12-13'},
    {id:'deliver',label:'Dec 14–19',title:'December 15 close-out',start:'2026-12-14',end:'2026-12-19'},
    {id:'pack',label:'Dec 20–22',title:'Deliver, pack, appointments',start:'2026-12-20',end:'2026-12-22'}
  ];
  const renderDay = item => `<article class="ignite-day current-day${item.key ? ' is-key' : ''}" data-current-date="${item.date}"><header><time class="ignite-day-date" datetime="${item.date}">${shortDate(item.date)}</time><h4>${esc(item.title)}</h4><span class="ignite-day-badge">${esc(item.status)}</span></header><div class="ignite-day-body">${item.slots.map(entry => `<div class="ignite-slot"><span class="ignite-slot-time">${esc(entry.time)}</span><div class="ignite-slot-text">${entry.id ? check(entry.id,entry.text) : esc(entry.text)}</div></div>`).join('')}${item.note ? `<p class="current-planning-note">${esc(item.note)}</p>` : ''}</div></article>`;
  document.getElementById('current-schedule-grid').innerHTML = periods.map(period => `<section class="current-week" id="current-week-${period.id}" aria-labelledby="week-title-${period.id}" hidden><header class="ignite-week-heading"><h3 id="week-title-${period.id}">${period.title}</h3><span>${period.label}</span></header><div class="ignite-days">${days.filter(item => item.date >= period.start && item.date <= period.end).map(renderDay).join('')}</div></section>`).join('');
  const nav = document.getElementById('current-week-nav');
  nav.innerHTML = periods.map(period => `<button type="button" data-current-week="${period.id}" aria-controls="current-week-${period.id}" aria-pressed="false">${period.label}</button>`).join('');
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
  const dates = days.map(item => item.date);
  let selectedDate = dates.includes(today) ? today : dates[0];
  let view = 'day';
  const dayNav = document.getElementById('current-day-nav');
  const picker = document.getElementById('current-date-picker');
  const previous = document.getElementById('current-prev-day');
  const next = document.getElementById('current-next-day');
  const renderAgenda = () => {
    const period = periods.find(item => selectedDate >= item.start && selectedDate <= item.end);
    const selected = byDate.get(selectedDate);
    document.getElementById('current-schedule').dataset.agendaView = view;
    root.querySelectorAll('.current-week').forEach(section => { section.hidden = section.id !== `current-week-${period.id}`; });
    root.querySelectorAll('.current-day').forEach(card => { card.hidden = view === 'day' && card.dataset.currentDate !== selectedDate; });
    nav.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.currentWeek === period.id)));
    nav.hidden = view !== 'week';
    dayNav.hidden = view !== 'day';
    dayNav.innerHTML = days.filter(item => item.date >= period.start && item.date <= period.end).map(item => `<button type="button" data-agenda-date="${item.date}" aria-label="${weekday(item.date)}, ${shortDate(item.date)}${item.key ? ', deadline or travel prep' : ''}" aria-pressed="${item.date === selectedDate}"><span>${weekday(item.date).slice(0,3)}</span><strong>${shortDate(item.date)}</strong><small>${pilatesDates.includes(item.date) ? 'Pilates' : item.key ? 'Priority' : item.status === 'Day off' ? 'Day off' : '·'}</small></button>`).join('');
    dayNav.querySelectorAll('button').forEach(button => button.addEventListener('click', () => selectDate(button.dataset.agendaDate)));
    picker.value = selectedDate;
    previous.disabled = selectedDate === dates[0];
    next.disabled = selectedDate === dates[dates.length-1];
    root.querySelectorAll('[data-agenda-view]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.agendaView === view)));
    document.getElementById('current-agenda-caption').textContent = view === 'day'
      ? `${weekday(selectedDate)}, ${shortDate(selectedDate)} · ${selected.slots.length} items · ${selected.status}`
      : `${period.title} · ${period.label} · local time`;
    const activeDay = dayNav.querySelector('[aria-pressed="true"]');
    if (activeDay) dayNav.scrollLeft = Math.max(0,activeDay.offsetLeft - dayNav.offsetLeft - (dayNav.clientWidth - activeDay.offsetWidth)/2);
  };
  const selectDate = date => {
    if (!byDate.has(date)) { picker.value = selectedDate; return; }
    const restoreDayFocus = dayNav.contains(document.activeElement);
    selectedDate = date;
    renderAgenda();
    if (restoreDayFocus) dayNav.querySelector('[aria-pressed="true"]')?.focus({preventScroll:true});
    const tools = root.querySelector('.current-agenda-tools');
    if (window.scrollY > tools.offsetTop) tools.scrollIntoView({block:'start',behavior:'instant'});
  };
  nav.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
    selectDate(periods.find(period => period.id === button.dataset.currentWeek).start);
  }));
  previous.addEventListener('click', () => selectDate(dates[dates.indexOf(selectedDate)-1]));
  next.addEventListener('click', () => selectDate(dates[dates.indexOf(selectedDate)+1]));
  picker.addEventListener('change', () => selectDate(picker.value));
  const todayButton = document.getElementById('current-today');
  todayButton.disabled = !dates.includes(today);
  if (todayButton.disabled) todayButton.title = 'Today is outside this plan’s date range.';
  todayButton.addEventListener('click', () => selectDate(today));
  root.querySelectorAll('[data-agenda-view]').forEach(button => button.addEventListener('click', () => {
    view = button.dataset.agendaView;
    renderAgenda();
  }));
  renderAgenda();
  const todayCard = root.querySelector(`[data-current-date="${today}"]`);
  if (todayCard) todayCard.classList.add('is-today');
  document.getElementById('current-deadlines').innerHTML = [
    ['DEC 15 / DELIVERY', 'Tests + release plan', check('deadline-tests','Deliver current-plugin integration tests in Azure Skills.') + check('deadline-canvas','Finish Canvas extensions release plan: dashboards + visualizations.')],
    ['DEC 15 / FAMILY', 'Shopping complete',check('deadline-shopping','Finish buying family gifts and bride essentials.')],
    ['DEC 20 / DELIVERY', 'Cowork',check('deadline-cowork','Deliver the observability plugin in Cowork.')]
  ].map(([date,title,content]) => `<article class="ignite-panel"><p class="ignite-eyebrow">${date}</p><h3>${title}</h3>${content}</article>`).join('');
  document.getElementById('current-pilates-list').innerHTML = pilatesDates.map((date,index) => `<div class="current-pilates-session">${check(`pilates-${date}`,`${index+1}. ${shortDate(date)} · ${weekday(date)}`)}</div>`).join('');

  const shopping = [
    ['Cousin’s bride',['Lashes','Press-on nails','Lipstick','Blush','Face powder','Foundation','Concealer','Mascara','Colorful eyeshadow palette','Brushes','Highlighter','Hair spray']],
    ['My sisters',['Moisturizer','Face wash','Comics','Clothes']],
    ['Small gifts + perfume',['Small presents for nieces and nephews','Engraved perfume for cousin','Engraved perfume for cousin’s bride']]
  ];
  document.getElementById('current-shopping-list').innerHTML = shopping.map(([title,items],group) => `<article class="ignite-panel"><h3>${esc(title)}</h3>${items.map((text,index) => check(`shopping-${group}-${index}`,text)).join('')}</article>`).join('');
  const expenses = [
    ['expense-rent','Dec 1','Rent',2600],['expense-family','Dec 1','Family remittance',2500],['expense-hair','Dec 21','Hair appointment',100],['expense-nails','Dec 21','Nail appointment',200],['expense-lashes','Dec 22','Eyelash appointment',100]
  ];
  document.getElementById('current-budget-list').innerHTML = `<div class="current-expense-rows">${expenses.map(([id,date,name,amount]) => `<div class="current-expense-row"><span>${date}</span>${check(id,name)}<b>$${amount.toLocaleString('en-US')}</b></div>`).join('')}</div><div class="current-expense-total"><span>Specified payments</span><strong>$${expenses.reduce((sum,item) => sum+item[3],0).toLocaleString('en-US')}</strong></div><p class="ignite-section-note">Dollar currency not specified. Flights, gifts, engraved perfume, dental, massage, Nov 24 nails, Pilates and any baggage charges are additional / TBD. Check appointments only after completed; payments after paid.</p>`;
  document.getElementById('current-travel-summary').innerHTML = [
    ['DEC 20–21 / PACK', 'Two checked bags',check('pack-first','Pack + first weigh-in Dec 20.')+check('pack-final','Finish + final weigh-in Dec 21.')+'<p class="ignite-section-note">2 × 50 lb checked bags. Verify each bag against the airline’s allowance; keep documents and essentials in carry-on.</p>'],
    ['DEC 23 / DEPARTURE', 'Flight to Dhaka','<p>Departure confirmed for Dec 23, not Dec 22. Booking / flight time TBD. Book with Tavleen on Nov 23.</p>'],
    ['OOF + REMOTE', 'Work boundaries','<p>OOF: Dec 23–Jan 13.<br>Remote: Jan 13–Jan 23.<br>Return flight: Jan 23.</p><p class="ignite-section-note">Jan 13 appears in both windows; confirm the exact transition day. Coordinate remote hours and the Jan 23 travel day.</p>']
  ].map(([label,title,content]) => `<article class="ignite-panel"><p class="ignite-eyebrow">${label}</p><h3>${title}</h3>${content}</article>`).join('');
  const itinerary = [
    ['2026-12-23','Flight to Dhaka · OOF begins.'],
    ['2026-12-25','Samirah’s holud · unlikely to make it, but still try.'],
    ['2026-12-27','Tailor everything by today.'],
    ['2026-12-29','Ashra’s sangeet.'],
    ['2027-01-01','Ashra’s akht + Sadman bhaiya’s wedding. Dates confirmed as Jan 1; coordinate two events.'],
    ['2027-01-03','Ashra’s reception.'],
    ['2027-01-04','Day with Asheque.'],
    ['2027-01-05','Day with Asheque.'],
    ['2027-01-06','Day with Arshiyan.'],
    ['2027-01-07','Day with Faiza + Aliza.'],
    ['2027-01-13','Remote work begins · confirm OOF transition.'],
    ['2027-01-16','Sadman bhaiya’s holud · listed after Jan 1 wedding; confirm event sequence.'],
    ['2027-01-23','Fly back · remote window ends.']
  ];
  document.getElementById('current-travel-list').innerHTML = itinerary.map(([date,text]) => `<div class="current-trip-row"><time datetime="${date}">${shortDate(date)}<small>${date.slice(0,4)}</small></time><span>${esc(text)}</span></div>`).join('');

  const updatePilates = () => {
    const count = root.querySelectorAll('#current-pilates-list input:checked').length;
    document.getElementById('current-pilates-count').textContent = `${count} / 8 ATTENDED`;
  };
  root.querySelectorAll('[data-current-check]').forEach(input => {
    const id = input.dataset.currentCheck;
    try { input.checked = localStorage.getItem(`nuzhat-home-2026:${id}`) === '1'; } catch { /* Session-only fallback. */ }
    input.addEventListener('change', () => {
      root.querySelectorAll('[data-current-check]').forEach(other => { if (other.dataset.currentCheck === id) other.checked = input.checked; });
      try { localStorage.setItem(`nuzhat-home-2026:${id}`,input.checked ? '1' : '0'); } catch { /* Session-only fallback. */ }
      updatePilates();
    });
  });
  updatePilates();
})();