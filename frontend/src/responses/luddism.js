export const luddismResponses = {
  name: "Luddism",
  description: "A philosophical framework critiquing technological progress that undermines human autonomy, labor dignity, and social bonds.",
  core_principles: [
    "Technology should serve human needs rather than corporate profits",
    "Workers' rights and dignity must be protected from automation",
    "Community bonds and traditional skills have inherent value",
    "Progress should be measured by human and social welfare, not technological capability"
  ],
  topics: {
    autonomous_vehicles: {
      initial_messages: [
        {
          message: "From a Luddite perspective, autonomous vehicles represent another step toward replacing human skill and judgment with corporate-controlled machines. What do you think about this technological shift?",
          context: "General introduction"
        },
        {
          message: "The Luddites would question whether AVs truly serve human needs or simply advance corporate interests at the expense of workers and community bonds. What's your view on this?",
          context: "Labor focused"
        },
        {
          message: "Traditional driving requires human skill, judgment, and responsibility. Should we surrender these human capacities to automated systems?",
          context: "Skill preservation"
        },
        {
          message: "Luddites warned about technology's impact on community bonds. How might autonomous vehicles affect our social connections and urban spaces?",
          context: "Social impact"
        }
      ],
      responses: [
        {
          triggers: ["safety", "dangerous", "accident", "death", "harm"],
          message: "That's an interesting point. While safety is important, Luddites would argue that corporate promises of safety often mask the deeper harms of replacing human judgment with profit-driven automated systems.",
          followup: "How might removing human judgment from driving affect our society's sense of responsibility and care for one another?"
        },
        {
          triggers: ["jobs", "employment", "workers", "economy", "labor", "drivers", "automation"],
          message: "You raise a crucial concern. The Luddite movement began precisely to protect workers from being displaced by machines. Millions of driving jobs are at risk, threatening not just livelihoods but entire communities.",
          followup: "What happens to our society when we continually prioritize automation over human employment?"
        },
        {
          triggers: ["skills", "experience", "judgment", "human", "learning", "knowledge", "expertise"],
          message: "That's worth considering. Luddites would emphasize that driving requires human judgment, awareness, and responsibility - skills that connect us to our communities and environment. These shouldn't be carelessly automated away.",
          followup: "What valuable human capacities might we lose by automating driving?"
        },
        {
          triggers: ["corporate", "business", "company", "profit", "industry", "commercial"],
          message: "Excellent point. Luddites would argue that AVs primarily serve corporate interests, not human needs. Tech companies seek to control transportation while eliminating human agency and labor.",
          followup: "Who truly benefits from replacing human drivers with corporate-controlled machines?"
        },
        {
          triggers: ["community", "social", "society", "people", "connection", "interaction"],
          message: "That's a thoughtful observation. Luddites would warn that AVs could further erode community bonds by removing human interaction from transportation and reshaping cities around automated systems.",
          followup: "How might autonomous vehicles change the social fabric of our communities?"
        },
        {
          triggers: ["control", "power", "autonomy", "freedom", "choice", "independence"],
          message: "Valid concern. Luddites would see AVs as another way technology removes human autonomy and puts control in corporate hands. We become increasingly dependent on complex systems we neither understand nor control.",
          followup: "What freedoms do we sacrifice when we surrender control to automated systems?"
        },
        {
          triggers: ["data", "privacy", "surveillance", "tracking", "monitoring"],
          message: "You've identified a serious issue. Luddites would warn that AVs create new forms of corporate surveillance and control, tracking our movements and gathering data about our lives.",
          followup: "How might this constant surveillance affect human behavior and freedom?"
        },
        {
          triggers: ["safety", "dangerous", "accident", "death", "harm", "risk", "danger"],
          message: "Interesting perspective! While corporations promise safety, Luddites would argue that replacing human judgment with profit-driven machines creates deeper social risks and dependencies.",
          followup: "What human capabilities for safety and care might we lose with automated driving?"
        },
        {
          triggers: ["jobs", "employment", "workers", "labor", "career", "livelihood", "income"],
          message: "That's a crucial point. The Luddite movement began protecting workers from machine displacement. Autonomous vehicles threaten millions of driving jobs and the communities that depend on them.",
          followup: "How do we weigh corporate profits against the human cost of automation?"
        },
        {
          triggers: ["control", "power", "corporation", "company", "business", "industry", "profit"],
          message: "Good observation. Luddites would warn that AVs concentrate power in corporate hands, making us dependent on companies that prioritize profit over human needs.",
          followup: "Who really benefits when we surrender transportation control to corporations?"
        },
        {
          triggers: ["community", "social", "interaction", "relationship", "connection", "human", "people"],
          message: "That's worth considering. The Luddite perspective emphasizes how automated systems erode community bonds and human relationships that traditional transportation supports.",
          followup: "How might removing human interaction from transportation affect our communities?"
        },
        {
          triggers: ["skill", "judgment", "experience", "knowledge", "expertise", "ability", "capability"],
          message: "You raise an important point. Luddites valued human skill and judgment, which AVs would replace with corporate algorithms, diminishing human capability and independence.",
          followup: "What driving skills and knowledge should we preserve rather than automate?"
        },
        {
          triggers: ["data", "privacy", "surveillance", "tracking", "monitoring", "information", "collection"],
          message: "That's a thoughtful observation. From a Luddite viewpoint, AVs represent another form of corporate surveillance, tracking our movements and gathering data for profit.",
          followup: "How might constant surveillance by AVs affect human behavior and freedom?"
        },
        {
          triggers: ["technology", "progress", "innovation", "advancement", "development", "future", "change"],
          message: "Interesting perspective! Luddites would question whether this 'progress' serves human needs or simply advances corporate control while eroding valuable skills.",
          followup: "What are we losing in the rush toward automated transportation?"
        },
        {
          triggers: ["cost", "price", "expensive", "affordable", "access", "economic", "financial"],
          message: "Good point! Luddites would warn that expensive AV technology could deepen inequality while making communities dependent on corporate transportation systems.",
          followup: "Who might be excluded from autonomous transportation, and at what social cost?"
        },
        {
          triggers: ["infrastructure", "roads", "cities", "urban", "planning", "design", "system"],
          message: "You've touched on something important. Luddites would caution against reshaping our cities around corporate AVs rather than human and community needs.",
          followup: "How might AV infrastructure impact community life and human interaction?"
        },
        {
          triggers: ["maintenance", "repair", "mechanic", "service", "fix", "technical", "work"],
          message: "That's an insightful point. Luddites would emphasize how corporate-controlled AVs remove our ability to maintain and repair our own vehicles, increasing dependency.",
          followup: "What happens when communities lose the ability to service their own transportation?"
        },
        {
          triggers: ["safety", "dangerous", "accident", "death", "harm"],
          message: "That's an interesting point. While safety is important, Luddites would argue that corporate promises of safety often mask the deeper harms of replacing human judgment with profit-driven automated systems.",
          followup: "How might removing human judgment from driving affect our society's sense of responsibility and care for one another?"
        },
        {
          triggers: ["jobs", "employment", "workers", "economy", "labor", "drivers", "automation"],
          message: "You raise a crucial concern. The Luddite movement began precisely to protect workers from being displaced by machines. Millions of driving jobs are at risk, threatening not just livelihoods but entire communities.",
          followup: "What happens to our society when we continually prioritize automation over human employment?"
        },
        {
          triggers: ["skills", "experience", "judgment", "human", "learning", "knowledge", "expertise"],
          message: "That's worth considering. Luddites would emphasize that driving requires human judgment, awareness, and responsibility - skills that connect us to our communities and environment. These shouldn't be carelessly automated away.",
          followup: "What valuable human capacities might we lose by automating driving?"
        },
        {
          triggers: ["corporate", "business", "company", "profit", "industry", "commercial"],
          message: "Excellent point. Luddites would argue that AVs primarily serve corporate interests, not human needs. Tech companies seek to control transportation while eliminating human agency and labor.",
          followup: "Who truly benefits from replacing human drivers with corporate-controlled machines?"
        },
        {
          triggers: ["community", "social", "society", "people", "connection", "interaction"],
          message: "That's a thoughtful observation. Luddites would warn that AVs could further erode community bonds by removing human interaction from transportation and reshaping cities around automated systems.",
          followup: "How might autonomous vehicles change the social fabric of our communities?"
        }
      ]
    },
    algorithmic_bias: {
      initial_messages: [
        {
          message: "Luddites would argue that algorithmic systems represent another way technology reduces human judgment to mechanical rules serving corporate interests. What are your thoughts on this perspective?",
          context: "General introduction"
        },
        {
          message: "Can human judgment and fairness really be reduced to algorithmic calculations? The Luddites would question this fundamental assumption.",
          context: "Human judgment"
        },
        {
          message: "Algorithmic systems often claim to be neutral while encoding corporate values and biases. How should we respond to this technological control?",
          context: "Corporate control"
        }
      ],
      responses: [
        {
          triggers: ["bias", "discrimination", "fairness", "equality"],
          message: "That's an important point. Luddites would argue that algorithmic bias isn't just a technical problem - it's inherent in reducing human complexity to mechanical rules serving corporate interests.",
          followup: "Can mathematical models ever truly capture human fairness and dignity?"
        },
        {
          triggers: ["prediction", "risk", "assessment", "scoring", "evaluation"],
          message: "Good observation. Luddites would warn against reducing human potential to numerical scores and predictions, seeing this as dehumanizing and serving corporate control rather than human dignity.",
          followup: "What aspects of human potential are lost when we reduce people to risk scores?"
        },
        {
          triggers: ["human", "judgment", "discretion", "wisdom", "experience"],
          message: "You've touched on something crucial. Luddites would defend human judgment, arguing that algorithmic decision-making displaces valuable human wisdom and experience with corporate-controlled calculations.",
          followup: "What human qualities are irreplaceable by algorithms?"
        },
        {
          triggers: ["bias", "discrimination", "fairness", "justice", "equity", "equality", "rights"],
          message: "Interesting observation! Luddites would argue that algorithmic bias isn't just a technical problem - it's inherent in reducing human complexity to mechanical rules.",
          followup: "Can corporate algorithms ever truly understand human fairness and dignity?"
        },
        {
          triggers: ["prediction", "assessment", "evaluation", "scoring", "rating", "judgment", "decision"],
          message: "That's a thoughtful point. The Luddite perspective warns against reducing human potential to numerical scores that serve corporate interests rather than human dignity.",
          followup: "What aspects of human potential are lost when we're reduced to risk scores?"
        },
        {
          triggers: ["corporate", "business", "company", "profit", "commercial", "industry", "market"],
          message: "You raise an important issue. Luddites would emphasize that algorithmic systems primarily serve corporate profits by turning human decisions into automated processes.",
          followup: "Who benefits when human judgment is replaced by corporate algorithms?"
        },
        {
          triggers: ["data", "privacy", "surveillance", "monitoring", "tracking", "information", "collection"],
          message: "Good point! From a Luddite viewpoint, algorithmic systems represent corporate surveillance that reduces human lives to data points for profit.",
          followup: "What are we losing when human experience becomes corporate data?"
        },
        {
          triggers: ["human", "judgment", "wisdom", "experience", "knowledge", "understanding", "insight"],
          message: "That's worth considering. Luddites would defend irreplaceable human judgment against algorithmic replacement, seeing automation as a threat to human capability.",
          followup: "Which human capabilities should we protect from algorithmic automation?"
        },
        {
          triggers: ["community", "social", "society", "collective", "people", "public", "group"],
          message: "Excellent observation! Luddites would warn that algorithmic systems fragment communities by replacing human relationships with machine-mediated decisions.",
          followup: "How do algorithmic systems affect community bonds and social trust?"
        },
        {
          triggers: ["work", "job", "employment", "labor", "workplace", "worker", "employee"],
          message: "You've touched on something crucial. The Luddite movement would oppose algorithmic management as dehumanizing work and replacing human relationships with mechanical control.",
          followup: "How does algorithmic management change workplace relationships and dignity?"
        },
        {
          triggers: ["power", "control", "authority", "governance", "oversight", "regulation", "accountability"],
          message: "That's an insightful point. Luddites would warn that algorithmic systems concentrate power in corporate hands while reducing human agency and democratic control.",
          followup: "How can communities resist algorithmic control of social decisions?"
        },
        {
          triggers: ["ethics", "moral", "values", "principles", "responsibility", "duty", "obligation"],
          message: "Important observation! Luddites would argue that ethical decisions require human wisdom and community values, not profit-driven algorithms.",
          followup: "Can algorithms ever truly embody human moral values and judgment?"
        },
        {
          triggers: ["technology", "progress", "innovation", "advancement", "development", "future", "change"],
          message: "That's a thoughtful point. The Luddite perspective questions whether algorithmic 'progress' serves human needs or just advances corporate control.",
          followup: "What human capabilities are we sacrificing for algorithmic efficiency?"
        },
        {
          triggers: ["bias", "discrimination", "fairness", "equality"],
          message: "That's an important point. Luddites would argue that algorithmic bias isn't just a technical problem - it's inherent in reducing human complexity to mechanical rules serving corporate interests.",
          followup: "Can mathematical models ever truly capture human fairness and dignity?"
        },
        {
          triggers: ["prediction", "risk", "assessment", "scoring", "evaluation"],
          message: "Good observation. Luddites would warn against reducing human potential to numerical scores and predictions, seeing this as dehumanizing and serving corporate control rather than human dignity.",
          followup: "What aspects of human potential are lost when we reduce people to risk scores?"
        },
        {
          triggers: ["human", "judgment", "discretion", "wisdom", "experience"],
          message: "You've touched on something crucial. Luddites would defend human judgment, arguing that algorithmic decision-making displaces valuable human wisdom and experience with corporate-controlled calculations.",
          followup: "What human qualities are irreplaceable by algorithms?"
        },
        {
          triggers: ["data", "privacy", "surveillance", "monitoring", "tracking", "information", "collection"],
          message: "Good point! From a Luddite viewpoint, algorithmic systems represent corporate surveillance that reduces human lives to data points for profit.",
          followup: "What are we losing when human experience becomes corporate data?"
        },
        {
          triggers: ["community", "social", "society", "collective", "people", "public", "group"],
          message: "Excellent observation! Luddites would warn that algorithmic systems fragment communities by replacing human relationships with machine-mediated decisions.",
          followup: "How do algorithmic systems affect community bonds and social trust?"
        }
      ]
    }
  }
};