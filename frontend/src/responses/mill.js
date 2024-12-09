export const millResponses = {
  name: "Mill's Liberalism",
  description: "A philosophical framework based on maximizing individual liberty while preventing harm, emphasizing rational discourse and evidence-based progress.",
  core_principles: [
    "Individual liberty should only be restricted to prevent harm to others",
    "Society benefits from diverse viewpoints and experimentation",
    "Progress should be guided by reason and evidence",
    "Ethical decisions must balance individual freedom with collective welfare"
  ],
  topics: {
    autonomous_vehicles: {
      initial_messages: [
        {
          message: "From Mill's liberal perspective, the key question about autonomous vehicles is how to balance technological progress and individual liberty with public safety. What are your thoughts on this balance?",
          context: "General introduction"
        },
        {
          message: "Interesting thought. Mill would argue that while individual freedom is vital, preventing harm can justify some restrictions on liberty. How should we apply this to autonomous vehicle development?",
          context: "Safety focused"
        },
        {
          message: "Technological progress often challenges existing freedoms, but Mill argued that experiments in living are essential. Should society embrace AVs as an experiment in public welfare?",
          context: "Experimental focus"
        },
        {
          message: "Liberty thrives on rational public discourse. How can we ensure fair representation of diverse views in decisions about AVs?",
          context: "Public discourse"
        },
        {
          message: "Interesting thought. Mill might ask whether autonomous vehicles represent a rational improvement in societal well-being or an overreach of technocratic ambition. How do you see it?",
          context: "Technological critique"
        }
      ],
      responses: [
        {
          triggers: ["safety", "dangerous", "accident", "death", "harm"],
          message: "That is an interesting point. Mill would argue that safety improvements justify some limitations on liberty, provided evidence demonstrates these changes effectively prevent harm without undue restriction.",
          followup: "What safety evidence would you consider sufficient to support autonomous vehicles?"
        },
        {
          triggers: ["blame", "responsibility", "fault", "liability"],
          message: "According to Mill, responsibility lies with those who had the means to prevent harm. This includes developers, regulators, and manufacturers who must act transparently and ethically.",
          followup: "How can we assign responsibility in a way that encourages innovation without neglecting accountability?"
        },
        {
          triggers: ["jobs", "employment", "workers", "economy"],
          message: "That is an interesting point. Mill would recognize the value of progress but also caution against neglecting those displaced by technology. Society should provide transitional support to workers affected by automation.",
          followup: "What strategies can governments or industries use to help workers adapt?"
        },
        {
          triggers: ["comfort", "design", "user experience", "choices"],
          message: "Interesting thought. Mill believed liberty includes the right to prioritize personal preferences. Design choices like comfort features should reflect a balance between user freedom and collective safety.",
          followup: "Should user preferences play a significant role in the design of AV systems?"
        },
        {
          triggers: ["regulation", "policy", "law", "rules"],
          message: "Interesting thought. Mill might argue that regulations must be justified by clear evidence of harm reduction, ensuring they don't infringe unnecessarily on personal freedoms or stifle progress.",
          followup: "What principles should guide policymakers in regulating autonomous vehicles?"
        },
        {
          triggers: ["privacy", "data", "tracking", "surveillance"],
          message: "That is an interesting point. Mill would be wary of surveillance without justification, emphasizing that privacy is essential for liberty. Data use by AVs must be transparent and consensual.",
          followup: "How can we ensure data privacy while maximizing the benefits of AV technology?"
        },
        {
          triggers: ["handoff", "control", "monitoring", "supervision"],
          message: "Interesting thought. Mill understood the challenges of human oversight. The 'handoff problem' must balance trust in AV systems with mechanisms for informed human intervention.",
          followup: "What strategies could improve the trust and effectiveness of human-machine collaboration?"
        },
        {
          triggers: ["testing", "development", "deployment", "rollout"],
          message: "Interesting thought. Mill supported careful experimentation, arguing that transparent and evidence-driven testing ensures the public can trust the safety and efficacy of new technologies.",
          followup: "How should AV developers approach testing to gain public confidence?"
        },
        // Autonomous Vehicles Additional Responses - Copy and paste into existing responses array
        {
          triggers: ["manufacturer", "maker", "producer", "company", "corporation", "industry", "business"],
          message: "That is an interesting point. Mill would insist that manufacturers bear significant responsibility for ensuring their AVs promote public welfare while respecting individual liberty. Their pursuit of profit must be balanced with social responsibility.",
          followup: "How can we ensure manufacturers prioritize both safety and individual rights?"
        },
        {
          triggers: ["public", "community", "society", "collective", "everyone", "population", "people"],
          message: "Mill's framework suggests that public benefit should guide AV development, with transparent decision-making processes that allow all voices to be heard.",
          followup: "What mechanisms would ensure genuine public input in AV development?"
        },
        {
          triggers: ["emergency", "crisis", "accident", "collision", "crash", "incident", "disaster"],
          message: "That is an interesting point. For Mill, emergency response protocols in AVs must balance swift action with respect for human agency. The system should maximize harm prevention while maintaining transparency.",
          followup: "How should AVs handle emergency situations while respecting human autonomy?"
        },
        {
          triggers: ["environment", "climate", "pollution", "emissions", "sustainable", "green", "eco"],
          message: "Mill's utilitarian approach would consider environmental benefits as part of the overall social good, but not at the expense of essential individual liberties.",
          followup: "How should environmental benefits be weighted against personal transportation freedom?"
        },
        {
          triggers: ["elderly", "disabled", "accessibility", "mobility", "seniors", "handicapped", "impaired"],
          message: "Interesting thought. Mill would advocate for AV design that expands liberty by increasing mobility for all, while ensuring these systems remain safe and accessible.",
          followup: "What design features are essential for universal accessibility?"
        },
        {
          triggers: ["speed", "performance", "efficiency", "optimization", "function", "operation", "capacity"],
          message: "That is an interesting point. Mill would argue that performance improvements must be balanced against safety and transparency, ensuring that efficiency gains don't compromise individual rights.",
          followup: "How can we optimize AV performance while maintaining safety and accountability?"
        },
        {
          triggers: ["rural", "remote", "countryside", "suburban", "outskirts", "regional", "local"],
          message: "Following Mill's concern for diverse circumstances, AV implementation must consider varying needs across different communities while preserving local autonomy.",
          followup: "How should AV systems adapt to different geographic and social contexts?"
        },
        {
          triggers: ["communication", "interaction", "signals", "alerts", "warnings", "notifications", "interface"],
          message: "Interesting thought. Mill would emphasize that clear communication between AVs and humans is essential for maintaining individual agency and informed decision-making.",
          followup: "What communication systems would best serve both passengers and pedestrians?"
        },
        {
          triggers: ["upgrade", "update", "maintenance", "repair", "service", "fix", "improvement"],
          message: "That is an interesting point. Mill's progressive viewpoint would support continuous improvement of AV systems, but with transparent processes and consideration of impacts on all users.",
          followup: "How should AV systems be updated while maintaining public trust and safety?"
        },
        {
          triggers: ["pedestrian", "cyclist", "walker", "biker", "runner", "passenger", "traveler"],
          message: "Interesting thought. Mill would insist on protecting vulnerable road users while preserving their freedom of movement, requiring AVs to accommodate diverse transportation choices.",
          followup: "How can AVs best protect all road users while maintaining efficient operation?"
        },
        // Expand this with more responses using slight variations in phrasing and focus.
        // Aim for 300+ responses by framing the above ideas differently and focusing on additional subtopics.
      ]
    },
    algorithmic_bias: {
      initial_messages: [
        {
          message: "Interesting thought. Mill emphasized that justice requires treating individuals as individuals, not merely as members of groups. How should this principle guide our use of algorithmic prediction systems?",
          context: "General introduction"
        },
        {
          message: "While Mill supported using evidence and reason in decision-making, he was deeply concerned about majority tyranny. How do we prevent algorithmic systems from encoding societal biases?",
          context: "Bias focused"
        },
        {
          message: "Justice, in Mill's view, means fairness in both outcomes and opportunities. Can algorithmic systems help achieve this ideal?",
          context: "Justice focused"
        },
        {
          message: "Liberty depends on trust in societal systems. How can we ensure that algorithmic tools earn and maintain public trust?",
          context: "Trust focused"
        },
        {
          message: "Interesting thought. Mill argued for the balance of progress and morality. Do algorithmic systems align with moral responsibility, or do they risk undermining human judgment?",
          context: "Ethical focus"
        },
        
      ],
      responses: [
        {
          triggers: ["bias", "discrimination", "fairness", "equality"],
          message: "That is an interesting point. Mill would insist that algorithmic systems remain transparent, allowing scrutiny to identify and mitigate biases that could harm individual liberty.",
          followup: "How can we enforce transparency while protecting proprietary algorithms?"
        },
        {
          triggers: ["policing", "justice", "crime", "surveillance"],
          message: "Interesting thought. Mill might argue that algorithms must operate under clear, evidence-based rules to avoid infringing on liberty without just cause.",
          followup: "What safeguards are essential to ensure algorithmic systems respect individual freedoms?"
        },
        {
          triggers: ["accountability", "responsibility", "ethics", "trust"],
          message: "Mill emphasized the importance of accountability. Developers of biased systems should be responsible for their impacts while fostering open public discourse.",
          followup: "How can we hold developers accountable without stifling innovation?"
        },
        {
          triggers: ["automation", "work", "economy", "transition"],
          message: "Interesting thought. Mill would advocate for systems that expand liberty by enhancing opportunity, suggesting that economic transitions require investment in worker retraining and education.",
          followup: "What policies could bridge the gap between technological innovation and economic equality?"
        },
        {
          triggers: ["data", "privacy", "tracking", "consent"],
          message: "That's a good point.Mill argued that liberty requires informed consent. Algorithmic systems must prioritize user autonomy in how data is collected and used.",
          followup: "What mechanisms ensure meaningful consent in data-driven systems?"
        },
        {
          triggers: ["predictive", "recidivism", "justice", "risk"],
          message: "Interesting thought. Mill would caution against reducing individuals to probabilities. Predictive algorithms should guide, not determine, decisions about individual treatment.",
          followup: "What balance between data-driven predictions and human judgment preserves justice?"
        },
        {
          triggers: ["historical", "past", "data", "patterns", "trends", "statistics", "records"],
          message: "Interesting thought. Mill would caution against perpetuating historical biases through algorithms, emphasizing that past patterns of discrimination shouldn't determine future opportunities.",
          followup: "How can we prevent historical biases from influencing algorithmic decisions?"
        },
        {
          triggers: ["transparency", "explainable", "interpretable", "understand", "clear", "obvious", "visible"],
          message: "Following Mill's emphasis on rational discourse, algorithmic systems must be explainable and open to public scrutiny to prevent hidden forms of oppression.",
          followup: "What level of transparency should we require from algorithmic systems?"
        },
        {
          triggers: ["minority", "marginalized", "underrepresented", "disadvantaged", "vulnerable", "protected"],
          message: "That is an interesting point. Mill's concern for protecting minorities from majority tyranny suggests special attention to how algorithms affect marginalized groups.",
          followup: "How can algorithmic systems better protect vulnerable populations?"
        },
        {
          triggers: ["impact", "effect", "influence", "consequence", "result", "outcome", "change"],
          message: "Interesting thought. Mill would insist on measuring the real-world impacts of algorithmic systems on individual liberty and social welfare, not just their technical accuracy.",
          followup: "What metrics should we use to evaluate algorithmic impact?"
        },
        {
          triggers: ["human", "judgment", "discretion", "review", "oversight", "intervention", "control"],
          message: "That is an interesting point. While supporting rational systems, Mill would argue for preserving human judgment in decisions that significantly affect individual liberty.",
          followup: "What role should human oversight play in algorithmic systems?"
        },
        {
          triggers: ["power", "authority", "control", "influence", "dominance", "governance", "oversight"],
          message: "Interesting thought. Mill would be concerned about the concentration of power in algorithmic systems, advocating for democratic oversight and distributed control.",
          followup: "How can we prevent algorithmic systems from becoming tools of oppression?"
        },
        {
          triggers: ["education", "learning", "training", "development", "growth", "improvement", "progress"],
          message: "That's a good point.Mill would emphasize the importance of education about algorithmic systems, enabling informed public participation in their development and deployment.",
          followup: "How can we better educate the public about algorithmic systems?"
        },
        {
          triggers: ["reform", "change", "improve", "update", "modify", "adjust", "correct"],
          message: "Following Mill's progressive views, algorithmic systems should be continuously improved based on evidence of their social impacts.",
          followup: "What mechanisms should exist for reforming biased algorithms?"
        },
        // Algorithmic Bias Additional Responses - Copy and paste into existing responses array
{
  triggers: ["database", "dataset", "information", "records", "files", "documentation", "history"],
  message: "Interesting thought. Mill would emphasize that the data feeding algorithmic systems must be scrutinized for historical biases and continuously updated to reflect social progress.",
  followup: "How can we ensure training data promotes fairness while maintaining accuracy?"
        },
        {
          triggers: ["model", "system", "program", "tool", "application", "software", "technology"],
          message: "Following Mill's principles, algorithmic models should expand rather than restrict individual liberty, with clear mechanisms for appeal and correction.",
          followup: "What features should be mandatory in algorithmic decision systems?"
        },
        {
          triggers: ["validation", "verification", "testing", "audit", "review", "check", "assessment"],
          message: "Interesting thought. Mill would advocate for rigorous testing of algorithmic systems, with particular attention to their impacts on individual liberty and minority rights.",
          followup: "What testing standards would best protect individual rights?"
        },
        {
          triggers: ["decision", "choice", "determination", "judgment", "conclusion", "ruling", "outcome"],
          message: "Interesting thought. Mill would insist that algorithmic decisions affecting individual liberty must be transparent and subject to meaningful appeal processes.",
          followup: "How can we ensure algorithmic decisions remain accountable to human oversight?"
        },
        {
          triggers: ["minority", "protected", "vulnerable", "disadvantaged", "underrepresented", "marginalized", "affected"],
          message: "Mill's concern for protecting minorities would emphasize detecting and preventing algorithmic discrimination against vulnerable groups.",
          followup: "What specific protections should exist for historically marginalized groups?"
        },
        {
          triggers: ["employment", "hiring", "job", "career", "work", "profession", "occupation"],
          message: "Interesting perspective! Mill would argue that algorithmic hiring tools must expand opportunities rather than reinforce existing barriers, with clear evidence of their fairness.",
          followup: "How can hiring algorithms promote both efficiency and fairness?"
        },
        {
          triggers: ["financial", "credit", "loan", "banking", "investment", "money", "economic"],
          message: "Following Mill's principles, financial algorithms must balance innovation with protecting individual economic liberty and preventing systematic discrimination.",
          followup: "What safeguards are needed in algorithmic financial decisions?"
        },
        {
          triggers: ["healthcare", "medical", "treatment", "diagnosis", "care", "health", "clinical"],
          message: "Interesting thought. Mill would emphasize that medical algorithms must preserve patient autonomy while improving care, with special attention to preventing discriminatory outcomes.",
          followup: "How can healthcare algorithms best serve diverse patient populations?"
        },
        {
          triggers: ["education", "learning", "school", "academic", "training", "teaching", "student"],
          message: "Mill's support for individual development suggests educational algorithms should enhance rather than limit opportunities, with transparent criteria.",
          followup: "What role should algorithms play in educational assessment?"
        },
        {
          triggers: ["oversight", "governance", "regulation", "compliance", "monitoring", "control", "supervision"],
          message: "Interesting perspective! Mill would advocate for democratic oversight of algorithmic systems, ensuring they serve public good while protecting individual rights.",
          followup: "What oversight structures would best protect both innovation and rights?"
        },
        {
          triggers: ["algorithm", "code", "software", "programming", "AI", "computer", "system"],
          message: "Mill would emphasize that algorithmic decisions in AVs must be transparent and subject to public scrutiny. The code controlling these vehicles represents a form of social power that requires democratic oversight.",
          followup: "How can we ensure AV algorithms remain transparent and accountable to the public?"
        },
        {
          triggers: ["urban", "city", "infrastructure", "roads", "streets", "planning", "traffic"],
          message: "That is an interesting point. Mill's perspective would consider how AVs reshape our urban environment. While innovation is valuable, we must ensure changes benefit all members of society, not just early adopters.",
          followup: "How should cities adapt to accommodate both autonomous and traditional vehicles?"
        },
        {
          triggers: ["ethics", "moral", "values", "principles", "guidelines", "standards"],
          message: "You've touched on something crucial. Mill would argue that ethical frameworks for AVs must balance individual rights with collective welfare, ensuring that automated decisions reflect society's moral values.",
          followup: "What ethical principles should guide AV decision-making in potential accident scenarios?"
        },
        {
          triggers: ["test", "trial", "experiment", "pilot", "research", "study", "data"],
          message: "That's a good point.Following Mill's empirical approach, AV testing should be rigorous and transparent, with results openly shared to inform public discourse and policy decisions.",
          followup: "What testing protocols would best serve the public interest?"
        },
        {
          triggers: ["cost", "price", "expensive", "affordable", "access", "equality", "equity"],
          message: "That's worth considering. Mill would stress that the benefits of AV technology should be accessible to all, not just the wealthy. Economic barriers could create new forms of social inequality.",
          followup: "How can we ensure equitable access to AV technology?"
        },
        {
          triggers: ["accident", "crash", "collision", "impact", "emergency", "risk", "danger"],
          message: "Interesting perspective! Mill's harm principle suggests that AVs must demonstrably reduce accident risks to justify their adoption, while remaining transparent about their safety limitations.",
          followup: "What level of safety improvement would justify mandatory AV adoption?"
        },
        {
          triggers: ["insurance", "liability", "legal", "lawsuit", "compensation", "damages", "claims"],
          message: "That's a thoughtful point. Mill would advocate for clear liability frameworks that protect individual rights while encouraging technological progress through fair risk distribution.",
          followup: "How should insurance and liability systems adapt to autonomous vehicles?"
        },
        {
          triggers: ["choice", "freedom", "autonomy", "rights", "liberty", "decision", "control"],
          message: "That's worth considering. Per Mill's principles, individuals should retain meaningful choice in transportation, with AV adoption driven by demonstrated benefits rather than coercion.",
          followup: "What role should personal choice play in the transition to autonomous vehicles?"
        },
        {
          triggers: ["society", "community", "public", "collective", "common", "shared", "everyone"],
          message: "That's a thoughtful point. Mill would emphasize that AV development must serve the broader public good, not just individual convenience or corporate profits.",
          followup: "How can we ensure AV technology serves all of society?"
        },
        {
          triggers: ["corporate", "business", "company", "industry", "profit", "commercial", "private"],
          message: "While supporting free enterprise, Mill would insist on corporate accountability and transparency in AV development to protect public safety and individual rights.",
          followup: "How can we balance corporate innovation with public accountability?"
        },
        // Add variations across justice, fairness, transparency, privacy, accountability, and other subtopics.
        // Build 300+ responses using slight rephrasings and additional subtopics.
      ]
    }
  }
};
