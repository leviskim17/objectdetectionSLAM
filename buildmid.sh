#!/bin/bash

mkdir -p build
cd build
cmake \
  -DBOOST_ROOT="${BOOST_ROOT}" \
  -DOpenCV_DIR="${OpenCV_DIR}" \
  -DPangolin_DIR="${Pangolin_DIR}" \
  ..
make -j8
cd ..
