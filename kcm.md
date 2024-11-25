---
layout: page
title: Theoretical model 
description: Theoretical framework of the KCM 
---

### The Kinetic Collective Model

The [Kinetic Collective Model](http://aip.scitation.org/doi/10.1063/1.4871672){:target="_blank_"} (KCM) developed in recent years improve the solution provided under the classical RTA.
The model, derived from the exact solution of the LBTE proposed by [Guyer and Krumhansl](https://journals.aps.org/pr/abstract/10.1103/PhysRev.148.766){:target="_blank_"},
is based on the splitting of the collision operator in normal and resistive processes (<b>C = N + R </b>) when calculating the scattering matrix.
As normal processes does not contribute directly to thermal resistance but redistribute momentum over all the phonon distribution,
a suitable way to solve the LBTE is by using the basis that diagonalizes the normal scattering collision operator.
This diagonalization allows to solve the BTE without complicating drastically the form of the drift operator.

The splitting of the collision operator allows to split the thermal conductivity in two contributions, kinetic and collective, 
weighed by a switching factor &Sigma; :

<center>&kappa; = (1-&Sigma;)&kappa;<sup>&lowast;</sup><sub>K</sub> + &Sigma;&kappa;<sup>&lowast;</sup><sub>C</sub> = &kappa;<sub>K</sub> + &kappa;<sub>C</sub> ,</center><div align="right">(1)</div> 

where &Sigma;=(1+<math>&langle;</math>&tau;<sub>N</sub><math>&rangle;</math> / <math>&langle;</math>&tau;<sub>R</sub><math>&rangle;</math>)<sup>-1</sup>. &Sigma; &isin; [0,1] measures the relative importance of the <i>N versus R</i> phonon scattering. <math>&langle;</math>&tau;<math>&rangle;</math> represents a temperature dependent averaged relaxation time. While &kappa;<sup>&lowast;</sup> is the limit thermal conductivity in each regime, &kappa;<sub>K</sub> and ;&kappa<sub>C</sub> are the actual contributions to thermal conductivity weighed by &Sigma;. In the current version of `KCM.py` are implemented the contributions that maximizes the entropy in each regime as defined [here](https://doi.org/10.1063%2F1.4871672){:target="_blank_"}:

<center>&kappa;<sup>&lowast;</sup><sub>K</sub>=&sum;<sub>i</sub>C<sub>i</sub>v<sub>i</sub>&otimes;v<sub>i</sub>&tau;<sub>i</sub> </center><div align="right">(2)</div>

<style>
    td.upper_line { border-top:solid transparent; border:0; border-color:transparent; border-width: 4px 0; }
    table.fraction { text-align: center; vertical-align: middle; border-color:transparent; border-width: 4px 0;
        margin-top:0.5em; margin-bottom:0.5em; line-height: 2em; }
</style>

<center><table class="fraction" align="center" cellpadding="0" cellspacing="0"><tr><td>
<div style="float:left;">&kappa;<sup>&lowast;</sup><sub>C</sub>=</div></td>
 <td> <div style="float:left"><div style="border-bottom:1px solid;font-size:small;text-align:center;">&sum;<sub>i</sub>C<sub>i</sub>v<sub>i</sub>q<sub>i</sub>&otimes;&sum;<sub>i</sub>C<sub>i</sub>v<sub>i</sub>q<sub>i</sub></div> <div style="font-size:small;text-align:center;">&sum;<sub>i</sub>C<sub>i</sub>q<sub>i</sub><sup>2</sup>/(&#8463;&omega;)<sup>2</sup>&tau;<sub>i</sub><sup>-1</sup></div>
  </div></td>
</tr>
</table></center> <div align="right">(3)</div>


![figkin](img/kinetic_regime.png){:width="350px"} ![figcol](img/collective.png){:width="350px"}

In the kinetic regime, each phonon behave independently, but in the collective regime, due to the effect
of <i>N</i> collisions appears a coupling between phonons. Therefore phonons of different modes perform as a whole
resistive collisions and share the same collision mean free time (MFT), the so-called collective MFT &tau;<sub>c</sub>.
In analogy with the definition of the thermal conductivity, the total phonon relaxation time can be defined from the
kinetic or resistive MFT &tau;<sub>K</sub> and the collective MFT &tau;<sub>C</sub> as:

<center>&tau; = (1-&Sigma;)&tau;<sup>&lowast;</sup><sub>K</sub> + &Sigma;&tau;<sup>&lowast;</sup><sub>C</sub> = &tau;<sub>K</sub> + &tau;<sub>C</sub> .</center> <div align="right">(4)</div>
<img class="ipsImage" src="https://physta.github.io/img/anim.gif" alt="img/anim.gif" width="350px" height="auto"><img class="ipsImage" src="https://physta.github.io/img/anim.png" alt="img/anim.png" width="350px" height="auto">

For a full understanding of the KCM look at [REFERENCES](https://physta.github.io/articles/).

### Hydrodynamic heat transport in KCM 

Since more than 10years ago the [nanoTransport Group](http://grupsderecerca.uab.cat/nanotransport/en){:target="_blank_"} has been working in heat hydrodynamics and
its applications to study nanoscale systems (see [REFERENCES](https://physta.github.io/articles/)).

As pointed out previously, using the basis that diagonalizes the normal scattering collision operator 
allows to study the drift operator in a simple way to higher orders, leading to an hydrodynamic equation beyond Fourier:

<center> &part;&tau;/&part;t + <b>q</b>
 = -&kappa;<b>&nabla;</b>T+&ell;<sup>2</sup>(&nabla;<sup>2</sup><b>q</b>+2&nabla;&nabla;<b>q</b>) ,</center><div align="right">(5)</div>

where <math>&ell;</math> is the non-local length (NL-param). From [Guyer and Krumhansl](https://journals.aps.org/pr/abstract/10.1103/PhysRev.148.766){:target="_blank_"} it is studied
the limiting case where normal proceses dominate,  &tau;<sub>N</sub><<&tau;<sub>R</sub>. In this limit, corresponding
to the collective regime, the NL-param is <math>&ell;<sup>2</sup><sub>C</sub><sup>&lowast;</sup>=&langle;v<sup>2</sup>&tau;<sub>N</sub>&rangle;&langle;&tau;<sub>C</sub>&rangle;</math>.

To have a global equation, in the KCM framework has been studied the kinetic limit &tau;<sub>N</sub>>>&tau;<sub>R</sub>,
leading to <math>&ell;<sup>2</sup><sub>K</sub><sup>&lowast;</sup>=&langle;v<sup>2</sup>&tau;<sub>R</sub>&rangle;&langle;&tau;<sub>R</sub>&rangle;</math>. This generalization allows to define a total non-local length as:

<center>&ell;<sup>2</sup> = (1-&Sigma;)&ell;<sup>2</sup><sub>K</sub><sup>&lowast;</sup> + &Sigma;&ell;<sup>2</sup><sub>C</sub><sup>&lowast;</sup> = &ell;<sup>2</sup><sub>K</sub> + &ell;<sup>2</sup><sub>C</sub> .</center><div align="right">(6)</div>

This extension of the Guyer and Krumhansl equation done in the KCM framework leads to the so-called hydrodynamic KCM equation (<b>Eq.5</b>).
This equation, together with suitable boundary conditions, can be implemented for finite elements simulations to study thermal 
properties in complex geometries (see [FINITE ELEMENTS](https://physta.github.io/finite_elements/)).
