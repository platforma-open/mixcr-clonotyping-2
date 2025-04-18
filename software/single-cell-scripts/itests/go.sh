#!/usr/bin/env bash

python ../src/preprocessing/main.py block_inputs/by_cell_a_GFDJXWFWMXT4MWYBJZW5Q6W4.tsv block_inputs/by_cell_b_GFDJXWFWMXT4MWYBJZW5Q6W4.tsv block_inputs/by_cell_a_SDFJXWFWMXT4MWYBJZW5Q6W4.tsv block_inputs/by_cell_b_SDFJXWFWMXT4MWYBJZW5Q6W4.tsv --output_chainA chainA_case2.tsv --output_chainB chainB_case2.tsv
python ../src/sc-group-builder/main.py --chainA chainA_case2.tsv --chainB chainB_case2.tsv --output_clonotype case2_clonotypes.tsv --output_cells block_outputs/case2_abundance.tsv
python ../src/output-processing/main.py --main_table case2_clonotypes.tsv --properties_a block_inputs/case2_properties_a.tsv --properties_b block_inputs/case2_properties_b.tsv --output_A1 block_outputs/case2_A1.tsv --output_A2 block_outputs/case2_A2.tsv --output_B1 block_outputs/case2_B1.tsv --output_B2 block_outputs/case2_B2.tsv

python ../src/preprocessing/main.py block_inputs/by_cell_a_UDG6VORA3Q5GP7TNBV4CQQP6.tsv block_inputs/by_cell_b_UDG6VORA3Q5GP7TNBV4CQQP6.tsv block_inputs/by_cell_a_VAALEKIPX7T6EOS6H62G6O3Q.tsv block_inputs/by_cell_b_VAALEKIPX7T6EOS6H62G6O3Q.tsv --output_chainA chainA_case1.tsv --output_chainB chainB_case1.tsv
python ../src/sc-group-builder/main.py --chainA chainA_case1.tsv --chainB chainB_case1.tsv --output_clonotype case1_clonotypes.tsv --output_cells block_outputs/case1_abundance.tsv
python ../src/output-processing/main.py --main_table case1_clonotypes.tsv --properties_a block_inputs/case1_properties_a.tsv --properties_b block_inputs/case1_properties_b.tsv --output_A1 block_outputs/case1_A1.tsv --output_A2 block_outputs/case1_A2.tsv --output_B1 block_outputs/case1_B1.tsv --output_B2 block_outputs/case1_B2.tsv
