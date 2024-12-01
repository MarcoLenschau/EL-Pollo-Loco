#!/bin/bash

SCRIPTS_LOG=$(npx eslint ./scripts/*.js)
MODELS_LOG=$(npx eslint ./models/*.js)
echo $SCRIPTS_LOG 
echo $MODELS_LOG
