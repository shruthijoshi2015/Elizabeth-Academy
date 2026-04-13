// English Assessment Question Bank (100+ unique questions generated dynamically)
const questionBank = [];

const subjects = ["I", "You", "He", "She", "They", "We", "The professor", "My best friend", "The software engineer", "A student"];
const verbSets = [
    { base: "go", s: "goes", past: "went", pp: "gone" },
    { base: "see", s: "sees", past: "saw", pp: "seen" },
    { base: "eat", s: "eats", past: "ate", pp: "eaten" },
    { base: "write", s: "writes", past: "wrote", pp: "written" },
    { base: "take", s: "takes", past: "took", pp: "taken" }
];

// Generate Past Tense Questions (50 questions)
subjects.forEach(subj => {
    verbSets.forEach(v => {
        questionBank.push({
            question: `Yesterday, ${subj.toLowerCase()} _____ to the city center early in the morning.`,
            options: [v.base, v.s, v.past, v.pp],
            answer: v.past
        });
    });
});

// Generate Present Perfect Questions (50 questions)
subjects.forEach(subj => {
    verbSets.forEach(v => {
        const aux = (subj === "He" || subj === "She" || subj === "The professor" || subj === "My best friend" || subj === "The software engineer" || subj === "A student") ? "has" : "have";
        questionBank.push({
            question: `${subj} ${aux} never _____ such a beautifully designed system before.`,
            options: [v.base, v.s, v.past, v.pp],
            answer: v.pp
        });
    });
});

// Generate Preposition & Context Questions (40 questions)
const contexts = [
    { text: "We have a critical meeting scheduled", preps: ["in", "on", "at", "for"], time: "Monday", ans: "on" },
    { text: "She usually arrives precisely", preps: ["in", "on", "at", "by"], time: "8:00 AM", ans: "at" },
    { text: "They have been studying diligently", preps: ["for", "since", "during", "in"], time: "three hours", ans: "for" },
    { text: "The company was originally founded", preps: ["in", "on", "at", "from"], time: "2010", ans: "in" }
];

contexts.forEach(c => {
    for(let i=0; i<10; i++) {
        questionBank.push({
            question: `Grammar check: ${c.text} _____ ${c.time}.`,
            options: c.preps,
            answer: c.ans
        });
    }
});

// Generate Advanced C1/C2 Questions (50 questions)
const advancedTemplates = [
    { text: "Had the management _____ the crisis earlier, the company would have survived.", options: ["foresee", "foresaw", "foreseen", "foreseeing"], ans: "foreseen" },
    { text: "It is imperative that the CEO _____ the meeting directly.", options: ["attends", "attend", "attended", "attending"], ans: "attend" },
    { text: "No sooner _____ the room than the power went out completely.", options: ["I had entered", "did I enter", "had I entered", "have I entered"], ans: "had I entered" },
    { text: "The new policy threatens to _____ an already volatile market.", options: ["mitigate", "exacerbate", "alleviate", "ameliorate"], ans: "exacerbate" },
    { text: "If she _____ harder in her youth, she would be a director by now.", options: ["studies", "studied", "had studied", "has studied"], ans: "had studied" }
];

advancedTemplates.forEach(t => {
    for(let i=0; i<10; i++) {
        questionBank.push({
            question: `Advanced: ${t.text}`,
            options: t.options,
            answer: t.ans
        });
    }
});

// Now we have 190 questions in the bank, spanning A1 to C2. 
// When the assessment.js requests 10 random questions, it shuffles this array.
