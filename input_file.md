---
layout: page
title: INPUT file 
description: How to define specific inputs.
---

An INPUT file is used by KCM.py to define specific parameters as temperatures or boundary effects.  

The INPUT file also allows to specify the outputs you want to obtain from the calculations, 
as cumulative thermal conductivity or the thermal conductivity tensor.

A default output file (K_T_size_component_mesh.dat) of thermal conductivity and NL-parameters as function of temperature is provided. This file can be used as input for finite elements simulations removing the caption line (see [FINITE ELEMENTS](https://physta.github.io/finite_elements/)).

An example INPUT file is download together with KCM.py in order to easier the definition of parameters. Use it as reference. Respect the spaces between the tag and the value to avoid problems.

### INPUT parameters

        TEMP= 100 200 300
        BOUNDARY= Y
        TYPE= W F
        L= 56e-9 0.03
        I_SF= 1.
        COMP= XX
        K_W= Y
        K_MFP= Y
        TAU_W= Y
        TAU_T= N
        STP= 100

See a brief explanation of each parameter:
- `TEMP`. Specify the temperature on which calculations will be carried. Write `ALL` if you want to run the calculation on all the temperatures. The temperatures must correspond
to those calculated in <b>phono3py</b> with the `--ts` option (see [USER GUIDE-GENERAL](https://physta.github.io/user_guide/)).
- `BOUNDARY`. Specify `Y` or `N` if you want or not include boundary scattering. This provide a broad approach to boundary effects. Better results are provided by the hydrodynamic
KCM approach (see [FINITE ELEMENTS](https://physta.github.io/finite_elements/)).
- `TYPE`. If considering boundary effects, indicate the type of sample: `W` for wire, `F` for film and `R` for rod.
- `L`. Represents the length of the sample. For a wire L=diameter, for a film L=thickness, and for a rod L=&radic;<span style="text-decoration: overline">A</span>, where A is the rod section. Specify different sizes if you want to run a calculation for more than one sample at the same time. Indicate as well the shape `W`, `F`, `R` in each case.

Some times is interesting to observe the effect of increase or decrease the effect of the impurity/mass defect on the thermal conductivity.
To avoid the need of repeating the calculation of the thermal conductivity with new isotope concentration `--mv`, it has been included the option `I_SF` (Impurity Scaling Factor):

- `I_SF` scales the the impurity/mass defect scattering relaxation time by the factor specified. Use a float value.

The next variables indicate the type of outputs:

- `COMP`. By default is written the component XX of the thermal conductivity tensor. Specify YY, ZZ, XY, XZ or YZ for other components. Use only one component in each calculation. 
- `K_W`. Output file of frequency dependence thermal conductivity. Here are included the contribution of each mode as well as the accumulation function.
- `K_MFP`. Output file of mean free path dependence thermal conductivity. Here are included the contribution of each mode as well as the accumulation function.
- `TAU_W`. Output file of frequency dependence relaxation times. The mode velocity is also included to easier the MFP representation.
- `TAU_T`. Output file of temperature dependence relaxation times. The mode velocity is also included to easier the MFP representation.
- `STP`. Indicates the number of elements used in the binning of the frequency dependent output file. `STP= 100` by default.
