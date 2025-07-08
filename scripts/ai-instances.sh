#!/bin/bash

# load popular docker images of nearly all LLM/AI images available

docker model pull ai/deepseek-r1-distill-llama:70B-Q4_0
docker model pull ai/deepcoder-preview
docker model pull ai/gemma3:4B-Q4_0
docker model pull ai/gemma3n:2B-F16
docker model pull ai/llama3.1:8B-F16
docker model pull ai/llama3.2:3B-Q4_0
docker model pull ai/llama3.3:70B-Q4_0
docker model pull ai/mistral-nemo
docker model pull ai/qwen2.5:7B-Q4_0
docker model pull ai/qwen3:14B-Q6_K
docker model pull ai/qwq:32B-Q4_0

