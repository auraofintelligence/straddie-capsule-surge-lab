(function () {
  const statusOptions = [
    ["Draft - needs review", "Draft - needs review"],
    ["Evidence checked", "Evidence checked"],
    ["Ready for compatibility review", "Ready for compatibility review"],
    ["Public approved", "Public approved"],
    ["Private only", "Private only"]
  ];

  const baseMeta = [
    { name: "draftStatus", label: "Draft status", type: "select", group: "File status", options: statusOptions },
    { name: "preparedBy", label: "Prepared by / organisation", type: "text", group: "File status", placeholder: "Project lead, venue, sponsor, co-op or agent team" },
    { name: "sourceDate", label: "Source date", type: "date", group: "File status" },
    { name: "reviewBy", label: "Needs review by", type: "text", group: "File status", placeholder: "Community reviewer, insurer, council, clinician, planner, trusted reader" }
  ];

  window.CAPSULE_BUILDERS = [
    {
      id: "site-value",
      title: "Site-Neutral Value Builder",
      file: "capsule-site-value.md",
      page: "site-value.html",
      description: "Builds the argument for why a suitable inland space deserves to be found, before anyone nominates an address.",
      claimBoundary: "Keep this site-neutral. Do not name or imply any specific street address, excluded site or unapproved site.",
      fields: [
        ...baseMeta,
        { name: "workingName", label: "Working name", type: "text", group: "Concept identity", placeholder: "Straddie Capsule Surge Lab, Inland Capsule Commons, Civic Simulation Stay" },
        { name: "locationFrame", label: "Location frame", type: "textarea", group: "Concept identity", rows: 3, placeholder: "Inland, village-edge, service-accessible, walkable to local activity, not beachfront, no exact address." },
        { name: "whySpace", label: "Why a space should be found", type: "textarea", group: "Public value", rows: 4, placeholder: "The pressure this space absorbs: accommodation, visitor flow, workforce housing, civic simulation, health surge, disaster readiness, AI literacy, cultural events." },
        { name: "capacity", label: "Capsule and room capacity", type: "textarea", group: "Quantified metrics", rows: 4, placeholder: "Number of sleeping capsules, work pods, simulation seats, wellness rooms, shared tables, service rooms, quiet spaces." },
        { name: "valueStreams", label: "Value streams", type: "checkbox-group", group: "Quantified metrics", options: [["overnight", "Overnight stays"], ["hourly", "Hourly simulation and work pods"], ["training", "AI and civic training"], ["health", "Health-surge logistics"], ["events", "Hackathons and retreats"], ["research", "Local evidence and dashboards"], ["workforce", "Workforce practice"], ["compatibility", "Compatibility and grant value"]] },
        { name: "metrics", label: "Metrics to model", type: "textarea", group: "Quantified metrics", rows: 4, placeholder: "Occupancy, visitor nights, hourly pod use, simulation hours, idle GPU-hours, training seats, local jobs, health-surge capacity, avoided travel, event days, revenue range." },
        { name: "gpuLayer", label: "Capsule GPU layer", type: "textarea", group: "Island compute", rows: 4, placeholder: "1-2 GPUs per capsule or nearby compute bay. Occupants first; idle capacity routes to kiosk, noticeboard, digital twin and local AI jobs." },
        { name: "rackTarget", label: "Supercompute rack target", type: "textarea", group: "Island compute", rows: 4, placeholder: "Roughly $3M AUD NVIDIA-class local rack ambition, only after demand, operators, power, cooling and governance are proven." },
        { name: "computeWorkloads", label: "Compute workloads", type: "checkbox-group", group: "Island compute", options: [["kiosks", "Disaster kiosks"], ["noticeboards", "Noticeboard network"], ["virtual-minjerribah", "Virtual Minjerribah"], ["web3", "Web3 Sensorium"], ["genai", "Text, image, video and song models"], ["health", "Aura and health-surge support"], ["science", "GNoME / AlphaFold-class science experiments"]] },
        { name: "communityReturn", label: "Community return", type: "textarea", group: "Public value", rows: 4, placeholder: "Local employment, co-op surplus, emergency beds, digital literacy, elder support, event capacity, youth pathways, low-cost access blocks." },
        { name: "siteFilters", label: "Site filters", type: "textarea", group: "Site selection without naming", rows: 4, placeholder: "Power, water, transport, service access, noise limits, neighbours, cultural review, planning pathway, evacuation, privacy, non-beachfront." },
        { name: "nextSteps", label: "Next steps", type: "textarea", group: "Next actions", rows: 4, placeholder: "Run a scenario, invite compatibility review, check planning constraints, price modular fit-out, draft public value note, hold private site review." }
      ]
    },
    {
      id: "civic-simulation",
      title: "Civic Simulation Builder",
      file: "capsule-civic-simulation.md",
      page: "civic-simulation.html",
      description: "Turns the capsule hotel into a rehearsal room for local AI, clean-city logistics and civic pressure.",
      claimBoundary: "Public simulation outputs should be aggregated, consent-aware and source-dated. Raw personal, health or commercial data stays private.",
      fields: [
        ...baseMeta,
        { name: "simulationFocus", label: "Simulation focus", type: "textarea", group: "Simulation identity", rows: 3, placeholder: "The hard day to rehearse: visitor flows, clean-city logistics, disaster response, health surge, food waste, workforce housing, events, transport." },
        { name: "inputs", label: "Inputs needed", type: "textarea", group: "Data and model inputs", rows: 4, placeholder: "Bookings, arrivals, weather, ferry timing, event calendar, service capacity, public notices, anonymous feedback, source trails." },
        { name: "interfaces", label: "Interfaces", type: "checkbox-group", group: "Data and model inputs", options: [["screen", "Shared simulation wall"], ["capsule", "Capsule workstation"], ["gpu", "Idle capsule GPU pool"], ["vr", "VR / AR review"], ["mobile", "Mobile access"], ["markdown", "Markdown exports"], ["kiosk", "Disaster kiosk / edge node"], ["noticeboard", "Noticeboard network"], ["dashboard", "Public dashboard"]] },
        { name: "computePath", label: "Compute path", type: "textarea", group: "Data and model inputs", rows: 4, placeholder: "Which jobs run on idle capsule GPUs, kiosk nodes, noticeboard devices, trusted external compute, or the future NVIDIA-class rack." },
        { name: "decisions", label: "Decisions this helps", type: "textarea", group: "Public value", rows: 4, placeholder: "Which services to open, where staff are needed, what visitors need, how emergencies are handled, what infrastructure has value." },
        { name: "privacy", label: "Privacy and consent boundary", type: "textarea", group: "Risk and review", rows: 4, placeholder: "What stays local, what is aggregated, group-size thresholds, withdrawal path, no surveillance creep." },
        { name: "publicOutput", label: "Public output", type: "textarea", group: "Public value", rows: 4, placeholder: "Source-dated scenario note, metrics dashboard, public briefing, grant appendix, agent-readable handoff." },
        { name: "nextSteps", label: "Next simulation steps", type: "textarea", group: "Next actions", rows: 4, placeholder: "Choose one scenario, gather safe sample data, export Markdown, invite reviewers, publish a public-safe summary." }
      ]
    },
    {
      id: "health-surge",
      title: "Health Surge Builder",
      file: "capsule-health-surge.md",
      page: "health-surge.html",
      description: "Shapes the ordinary capacity that matters in a health surge: beds, rest, intake, privacy, food, records and review.",
      claimBoundary: "This is planning support only. Clinical decisions, therapy claims and device operations need qualified review.",
      fields: [
        ...baseMeta,
        { name: "surgeUse", label: "Surge use case", type: "textarea", group: "Surge identity", rows: 4, placeholder: "Temporary staff accommodation, recovery rest, elder support, remote specialist visits, AI intake, public education, event health planning." },
        { name: "capacity", label: "Capacity assumptions", type: "textarea", group: "Capacity and operations", rows: 4, placeholder: "Capsules, staff beds, quiet rooms, shared tables, isolation limits, check-in flow, cleaning, laundry, transport." },
        { name: "auraFit", label: "Aura of Intelligence fit", type: "textarea", group: "Aura and data", rows: 4, placeholder: "Inside shell private, outside public. Values, story, health context, consent, public twin, agent-readable support notes." },
        { name: "wellness", label: "Wellness and recovery support", type: "checkbox-group", group: "Capacity and operations", options: [["sleep", "Sleep and rest"], ["food", "Food and hydration"], ["movement", "Movement"], ["sauna", "Sauna / heat"], ["hbot", "HBOT/PADS review path"], ["mental", "Low-pressure social support"], ["telehealth", "Telehealth or visiting specialists"], ["education", "Public health education"]] },
        { name: "reviewGates", label: "Review gates", type: "textarea", group: "Risk and review", rows: 4, placeholder: "Clinical, insurance, child safety, cultural, privacy, food safety, emergency, device and planning review." },
        { name: "metrics", label: "Metrics to track", type: "textarea", group: "Public value", rows: 4, placeholder: "Nights hosted, avoided travel, staff supported, education sessions, referral clarity, user satisfaction, incidents, response time." },
        { name: "nextSteps", label: "Next health-surge steps", type: "textarea", group: "Next actions", rows: 4, placeholder: "Draft protocol, identify reviewers, map local support, make public/private data rules, cost a small pilot." }
      ]
    },
    {
      id: "compatibility-note",
      title: "Compatibility & Confidence Builder",
      file: "capsule-compatibility-note.md",
      page: "compatibility-note.html",
      description: "Creates a gentle note for the grey area: compatibility, trust, intimacy of fit and confidence-building without directing anyone's goals.",
      claimBoundary: "Use this for exploration, compatibility and confidence-building only. It is not a commitment, approval claim, hidden ask or fixed outcome.",
      fields: [
        ...baseMeta,
        { name: "relationshipContext", label: "Compatibility context", type: "select", group: "Exploration context", options: [["Early curiosity", "Early curiosity"], ["Community reviewer", "Community reviewer"], ["Possible host or landholder", "Possible host or landholder"], ["Health or wellbeing reviewer", "Health or wellbeing reviewer"], ["Education or training ally", "Education or training ally"], ["Government or grant reader", "Government or grant reader"], ["Resident or local group", "Resident or local group"], ["Trusted friend of the project", "Trusted friend of the project"]] },
        { name: "feltSense", label: "What feels compatible", type: "textarea", group: "Exploration context", rows: 4, placeholder: "Shared values, local care, NFP spirit, practical confidence, willingness to learn slowly, joyful responsible abundance." },
        { name: "openQuestion", label: "Open question, not an ask", type: "textarea", group: "Exploration context", rows: 3, placeholder: "What would be worth exploring together, without implying agreement, approval, funding or a site direction?" },
        { name: "publicValue", label: "Public value to sense-check", type: "textarea", group: "Confidence signals", rows: 4, placeholder: "Beds, access blocks, simulation hours, idle GPU-hours, local training, health-surge support, disaster readiness, public ledgers." },
        { name: "confidenceSignals", label: "Confidence signals", type: "textarea", group: "Confidence signals", rows: 4, placeholder: "What would make people more comfortable: clearer boundaries, small trial, source dates, cost range, governance, privacy review, local story." },
        { name: "gentleMetrics", label: "Metrics that help without pressuring", type: "textarea", group: "Confidence signals", rows: 4, placeholder: "Small numbers that make the idea concrete but do not pretend to prove feasibility or force a yes." },
        { name: "greyArea", label: "Grey area to hold carefully", type: "textarea", group: "Intimacy and boundaries", rows: 4, placeholder: "Where the idea is promising but not settled: site fit, local comfort, health claims, compute ambition, funding, cultural review, privacy." },
        { name: "boundaries", label: "Boundaries that protect trust", type: "textarea", group: "Intimacy and boundaries", rows: 4, placeholder: "No chosen address, no approval claim, no forced relationship, no hidden land campaign, no raw private data, no fixed outcome." },
        { name: "privateNotes", label: "Private notes", type: "textarea", group: "Private / approval-gated", rows: 4, private: true, placeholder: "Names, sensitive context, unapproved site thoughts, negotiation details, feelings that should not be public." },
        { name: "nextSteps", label: "Gentle next move", type: "textarea", group: "Next actions", rows: 4, placeholder: "Share a note, invite reflection, run a small scenario, ask what feels off, record questions, update the source date." }
      ]
    }
  ];
})();
