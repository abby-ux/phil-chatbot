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
          message: "Mill would argue that while individual freedom is vital, preventing harm can justify some restrictions on liberty. How should we apply this to autonomous vehicle development?",
          context: "Safety focused"
        }
      ],
      responses: [
        {
          triggers: ["safety", "dangerous", "accident", "death", "harm"],
          message: "Mill would argue that safety improvements that reduce harm justify some limitations on individual choice - but only if clearly supported by evidence. We must ensure restrictions on traditional driving are proportional to demonstrated safety benefits.",
          followup: "What evidence should we require before restricting individual driving choices in favor of autonomous systems?"
        },
        {
          triggers: ["blame", "responsibility", "fault", "liability"],
          message: "Mill's framework suggests we should assign responsibility based on who had the capability to prevent harm while preserving liberty. With autonomous vehicles, this means examining the entire chain of decision-making, from engineers to operators.",
          followup: "How can we create accountability systems that don't stifle innovation yet ensure responsible development?"
        },
        {
          triggers: ["jobs", "employment", "workers", "economy"],
          message: "While Mill supported progress, he emphasized managing transitions to prevent unnecessary harm. We should balance autonomous vehicle development with programs to help affected workers adapt and find new opportunities.",
          followup: "How can we advance technology while protecting individual workers' ability to prosper?"
        },
        {
          triggers: ["testing", "development", "deployment", "rollout"],
          message: "Mill would likely support careful experimentation with new technologies, but emphasize transparent evidence-gathering and public discourse about risks. We must ensure development processes maximize learning while minimizing harm.",
          followup: "What testing standards would appropriately balance innovation with safety?"
        }
      ]
    },
    algorithmic_bias: {
      initial_messages: [
        {
          message: "Mill emphasized that justice requires treating individuals as individuals, not merely as members of groups. How should this principle guide our use of algorithmic prediction systems?",
          context: "General introduction"
        },
        {
          message: "While Mill supported using evidence and reason in decision-making, he was deeply concerned about majority tyranny. How do we prevent algorithmic systems from encoding societal biases?",
          context: "Bias focused"
        }
      ],
      responses: [
        {
          triggers: ["prediction", "recidivism", "criminal", "justice"],
          message: "Mill would likely be deeply skeptical of using algorithms to predict individual behavior based on group statistics. This risks treating people as determined by their circumstances rather than as autonomous agents capable of change.",
          followup: "How can we use data to improve justice while preserving individual dignity?"
        },
        {
          triggers: ["police", "enforcement", "surveillance", "prevention"],
          message: "Mill argued that preventing harm requires evidence of specific threats, not general suspicion. Predictive policing based on broad correlations risks unjustly restricting liberty without proper justification.",
          followup: "What standards of evidence should we require before using algorithmic predictions to restrict liberty?"
        },
        {
          triggers: ["bias", "discrimination", "fairness", "equality"],
          message: "Mill would insist that algorithmic systems be transparent and subject to public scrutiny. Hidden biases in these systems could create new forms of oppression that are harder to identify and resist.",
          followup: "How can we ensure algorithmic systems enhance rather than diminish individual liberty?"
        },
        {
          triggers: ["human", "judgment", "decision", "discretion"],
          message: "While Mill supported using reason and evidence, he emphasized that mechanical rules can't replace careful consideration of individual circumstances. Algorithms should inform but not replace human judgment.",
          followup: "What role should algorithmic predictions play in human decision-making?"
        }
      ]
    }
  }
};