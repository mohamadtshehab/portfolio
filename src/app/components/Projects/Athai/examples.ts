interface Example {
    imageUrl?: string;
    prompt?: string;
    modelUrl: string;
    mtlUrl: string;
  }

  const examples: Record<'example1' | 'example2', Example> = {
    example1: {
      imageUrl: "/tmpgncelpjy.jpg",
      modelUrl: "/tmpgncelpjy.obj",
      mtlUrl: "/tmpgncelpjy.mtl"
    },
    example2: {
      prompt: "Generate a modern grey square armchair with clean lines, a thick seat cushion, and light wooden legs, featuring a boxy silhouette with a low back and wide, flat armrests, conveying a contemporary and minimalist style.",
      modelUrl: "/tmpn82c48ff.obj",
      mtlUrl: "/tmpn82c48ff.mtl"
    }
  };

  export default examples;