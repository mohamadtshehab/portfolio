/** Authored illustrations of the target style, not recorded model outputs. */
export const examples = [
  {
    id: "retrieval",
    title: "Retrieval-augmented generation",
    abstract:
      "We study a question-answering system that retrieves passages from a document collection before generating an answer. Retrieved passages are included in the language model’s prompt. In our experiments, answers are more consistent with the supplied documents than those from a baseline model without retrieval. The system does not change the language model’s weights.",
    plain:
      "The system finds relevant passages and gives them to a language model along with the question. In these experiments, its answers match the documents more closely than answers produced without retrieval. The model’s weights stay unchanged; the extra information comes from the prompt.",
    structured: [
      {
        heading: "The problem",
        text: "How can a language model answer questions more consistently with a collection of documents?",
      },
      {
        heading: "The idea",
        text: "Retrieve relevant passages first, then include them in the prompt. Think of giving the model reference notes before it answers.",
      },
      {
        heading: "The takeaway",
        text: "Answers matched the supplied documents more closely in these experiments. The model itself was not retrained; retrieval changed the information it received.",
      },
    ],
  },
  {
    id: "adapters",
    title: "Learning with a LoRA adapter",
    abstract:
      "We adapt a pretrained language model to a specialized writing task using a low-rank update. The pretrained parameters remain fixed while a small set of adapter parameters is optimized on task examples. The resulting adapter is evaluated for output structure and content accuracy. It reproduces the requested structure but still makes terminology errors.",
    plain:
      "The researchers keep the original model parameters fixed and train a smaller adapter on examples of the writing task. The adapted model learns the requested output structure, but some terminology remains incorrect. Learning the format does not establish that the content is accurate.",
    structured: [
      {
        heading: "The problem",
        text: "Teach a pretrained model a particular writing style while keeping its original parameters fixed.",
      },
      {
        heading: "The idea",
        text: "Train a small LoRA adapter on task examples. The adapter learns an adjustment to the model rather than replacing all of its existing parameters.",
      },
      {
        heading: "The takeaway",
        text: "The requested structure was learned, but terminology errors remained. Matching a style and explaining a concept correctly are separate outcomes.",
      },
    ],
  },
  {
    id: "compression",
    title: "A language model on a laptop",
    abstract:
      "We evaluate lower-precision representations of a language model’s weights for deployment on a memory-constrained laptop. The compressed model uses less memory than the full-precision version. We compare response quality and memory use across representations. Some tasks retain similar quality, while others show a drop. The study does not evaluate model training.",
    plain:
      "The researchers represent model weights at lower precision to reduce memory use on a laptop. Response quality stays similar for some tasks and falls for others. This study examines deployment and response quality, not the resources required to train a model.",
    structured: [
      {
        heading: "The problem",
        text: "Fit a language model into a laptop’s limited memory.",
      },
      {
        heading: "The idea",
        text: "Store model weights at lower precision. This reduces memory use, but the researchers also check what happens to response quality.",
      },
      {
        heading: "The takeaway",
        text: "Some tasks retained similar quality; others became worse. The results concern running the model, and do not establish how much memory training would need.",
      },
    ],
  },
] as const;
