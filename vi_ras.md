---
layout: page
title: Tips for calculations
description: Tips for calculations.
---

The calculations of thermal conductivity for different structures and materials
may require specific parameters, constrains, etc., for the calculations of force constants and 
relaxation times.

Here are given some tips derived from self experiences to easier 
the calculations of thermal conductivity. If you have any suggestion please sent an <a href="mailto:{{ "pol.torres@uab.cat" }}" title="Email me" target="_blank">email</a>
with the details and we will include your tips. 

### Calculation of force constants

For the calculation of force constants it is recommended to use a cubic conventional cell, 
as is better to produce a symmetric supercell for the calculation of the interatomic force constants.

### General calculation of thermal conductivity

For KCM we recommend, if possible, to use primitive cell using `--pa` option. This provide better results and reduce the computational time.

The calculation of the thermal conductivity reducing to primitive cell using `--pa` option provides different
results of those obtained with a conventional cell using the same grid sampling. As the size, and even the shape, of the first Brillouin Zone (1BZ)
is different if it is used a primitive or conventional cell, the sampling of the 1BZ with the same `mesh` is not equivalent. This differences, tested on
`--lbte` mode and KCM appears to be higher for instance in diamond than in silicon, where normal processes have a relevant
effect on thermal transport.

<center><img class="ipsImage" src="https://physta.github.io/img/conductivity.png" alt="img/anim.gif"></center>
<center>Fig.1: Thermal conductivity of semiconductors with KCM in a 20x20x20 grid</center>

For general calculations of thermal conductivity it is recommended at least a 20x20x20 gird (see Fig.1).
For calculations of the NL-length it is recommended at least 40x40x40.

### Thermal conductivity on 2D materials

The thermal conductivity from <i> first principles </i> of 2D materials, as graphene or MoS<sub>2</sub>, requires some
considerations:
- On the calculation of force constants it is required to use a large _z_ component in order
to avoid undesired interactions of the upper and lower sheet.  
- On the calculation of the thermal conductivity, the value of &kappa; is normalized by the volume of the
supercell, therefore, larger _z_ component will reduce the thermal conductivity. To compare with experiments,
the value of the thermal conductivity &kappa; provided by <i> first principles </i> has to be rescaled 
multiplying by the _z_ value used in the POSCAR and divided by the interlayer distance of the bulk material.

<center><img class="ipsImage" src="https://physta.github.io/img/graphene.png" alt="img/anim.gif"></center>


