type Detail = { title: string; intro: string; items: [string, string][] };
export const pageDetails: Record<string, Detail> = {
  home: {
    title: "Find a starting point that feels like yours.",
    intro:
      "You do not need a competitive background to care about getting stronger. Start with the change you want to make, then explore the support that fits.",
    items: [
      [
        "Build a routine",
        "If you are new to the gym or starting again, explain what has made consistency difficult. Your schedule, confidence with equipment, and previous experience are useful places to begin.",
      ],
      [
        "Train with a goal",
        "Whether your focus is everyday strength or the demands of a sport, give that goal some context. What do you want to do more confidently, and what would meaningful progress look like?",
      ],
      [
        "Make the next step practical",
        "Explore the coaching options, try a free planning tool, or send Brock an introduction. You can ask about training format, location, and availability before deciding how to move forward.",
      ],
    ],
  },
  coaching: {
    title: "Choose a focus. Bring the whole picture.",
    intro:
      "Strength, movement, and performance often overlap. These starting points help you describe what you need; the first conversation can clarify which focus makes sense.",
    items: [
      [
        "Strength for everyday life",
        "Talk about your experience with resistance training, movements you want to learn, and what stronger would mean to you. For a beginner, confidence with the basics may be an important first goal. For an experienced lifter, the conversation may center on structure and consistency.",
      ],
      [
        "Movement with intention",
        "Share the activities you want to feel more capable doing, along with the equipment and space you have. Movement quality and control provide useful context for coaching. Questions about pain, medical clearance, or rehabilitation belong with an appropriate healthcare professional.",
      ],
      [
        "Training for your sport",
        "Include your sport, position, competition level, and season schedule. Brock’s professional baseball and pitching-coach experience is especially relevant to athletes discussing the demands of the mound. Confirm the specific coaching format and availability directly with him.",
      ],
    ],
  },
  about: {
    title: "The experience behind the perspective.",
    intro:
      "Brock’s path connects early ambition, professional competition, and the discipline of working back from a setback.",
    items: [
      [
        "Washington roots. A professional opportunity.",
        "At W.F. West High School in Washington, Brock developed as a pitcher before being selected straight out of high school by the Arizona Diamondbacks in the 16th round of the 2019 MLB Draft. His professional career began with a new level of preparation and competition.",
      ],
      [
        "A return built through persistence",
        "Tommy John surgery in his first professional year interrupted that path. He committed to rehabilitation and returned to professional competition during his five years in the Diamondbacks organization. That experience gives personal context to his emphasis on patience and consistent work.",
      ],
      [
        "Passing experience forward",
        "As an MDM Pitching Performance assistant coach, Brock helps athletes develop pitching mechanics, arm-care routines, and the mental side of the game. At Bold Performance, his NASM certification and playing background inform conversations about strength, movement, and purposeful training.",
      ],
    ],
  },
  approach: {
    title: "Make the plan fit real life.",
    intro:
      "Useful coaching conversations connect what you want to achieve with the time, experience, and resources you actually have.",
    items: [
      [
        "Define a useful starting point",
        "Describe your current routine, what has worked before, and where you get stuck. A clear goal can be as practical as building a consistent training week or feeling more confident with a movement. Mention any event or season that gives your goal a timeline.",
      ],
      [
        "Agree on the practical details",
        "Discuss session frequency, location, equipment, and coaching availability before making a commitment. Ask how a typical session is organized, how questions are handled, and what you should do between sessions. Confirm pricing and scheduling directly with Brock.",
      ],
      [
        "Keep the conversation specific",
        "Bring observations from your training: sessions completed, exercises practiced, or questions that came up. These details give you and Brock something concrete to discuss. Tools can help organize a week or record a number, while your context gives that number meaning.",
      ],
    ],
  },
  contact: {
    title: "What happens after your introduction?",
    intro:
      "The form gives your first conversation a useful starting point. An inquiry does not reserve a session or commit you to a training package.",
    items: [
      [
        "Share the essentials",
        "Choose your main goal and preferred training focus, then add the experience and schedule details you know. If you are unsure which option fits, say so in the notes. A parent or guardian can introduce a younger athlete using the relevant form option.",
      ],
      [
        "Review before you send",
        "When email-draft mode is active, review the generated introduction and send it from your email app. Nothing reaches Brock until you send it. If direct delivery is enabled, wait for the confirmation on this page; a delivery error keeps your answers available.",
      ],
      [
        "Talk through the fit",
        "Use the follow-up conversation to discuss coaching options, current availability, training location, and pricing. You can also call, text, or email directly. There is no instant booking or payment step on this website.",
      ],
    ],
  },
  tools: {
    title: "Build a toolkit for your kind of training.",
    intro:
      "Search by a task such as plates, protein, or pace, or narrow the directory by category. Each tool has a dedicated page with instructions and an example.",
    items: [
      [
        "Before your session",
        "Use the weekly planner to outline your training days and the workout time planner to estimate a session. For a planned barbell workout, calculate a percentage, convert units if necessary, and check the plates needed for the total load.",
      ],
      [
        "During and after training",
        "Time a rest interval, calculate volume for an exercise, or record a session effort score. For a run, convert distance and finish time into average pace. Compare like-for-like inputs and keep your own record if you want to track changes over time.",
      ],
      [
        "Organize nutrition numbers",
        "Convert an existing macro split into grams, divide a chosen protein target across meals, scale label servings, or compare recorded water with your goal. These tools calculate from your inputs; they do not select a diet or determine your individual needs.",
      ],
    ],
  },
};
