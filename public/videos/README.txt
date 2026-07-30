Drop the final concatenated Deployment Sequence file here as:
  deployment-sequence.mp4

Expected: 4 hard-cut clips (Strategy / Digital / Civil / Ops), 4K, muted loop.
DeploymentSequence.jsx reads /videos/deployment-sequence.mp4 directly (public folder,
not a bundled import) so dropping the file in is a zero-code-change swap.
Update the `start` timestamps in src/data/hierarchy.js (deploymentCuts) to match
your actual cut points once the real file is in place.
