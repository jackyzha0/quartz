---
title: Gaussian Impulse Generating
tags:
  - UWB
  - signal-processing
  - signal-generating
date: 2023-11-23
---
# Equation

sinusoidal signal modulation:

$$
x(t) = A \cdot e^{(j2\pi ft)} \cdot e^{[-\frac{1}{2\sigma^2} \cdot (t-t_0)^2]}
$$
Let's consider the case in which the gaussian peak is at 0 and the total amplitude is 1:

$$
x(t) = e^{(j2\pi ft)} \cdot e^{[-\frac{1}{2\sigma^2} \cdot t^2]}
$$
So, considering the Fourier transform properties:

$$
e^{-\frac{t^2}{2\sigma^2}} \leftrightarrow \sigma\sqrt{2\pi} e^{\frac{-\sigma^2 \omega^2}{2}}
$$

$$
e^{i\omega_0 t} f(t) = F(\omega - \omega_0)
$$

So, the spectrum of sinusoidal signal modulation gaussian pulse:

$$
X(\omega) = \sigma \sqrt{2\pi} e^{\frac{-\sigma^2(\omega - f_c)^2}{2}}
$$

## Equation in scipy.signal.gausspulse

$$
e^{-a t^2} e^{-j2\pi f_c t}
$$

here's pair:

$$
\mathcal{F}[e^{-ax^2}](f) = \sqrt{\frac{\pi}{a}} e^{-\pi^2 \frac{f^2}{a}}
$$
and, here's scipy.signal.gausspulse source code:

```python
def gausspulse(t, fc=1000, bw=0.5, bwr=-6, tpr=-60, retquad=False,
               retenv=False):
    """
    Return a Gaussian modulated sinusoid:

        ``exp(-a t^2) exp(1j*2*pi*fc*t).``

    If `retquad` is True, then return the real and imaginary parts
    (in-phase and quadrature).
    If `retenv` is True, then return the envelope (unmodulated signal).
    Otherwise, return the real part of the modulated sinusoid.

    Parameters
    ----------
    t : ndarray or the string 'cutoff'
        Input array.
    fc : float, optional
        Center frequency (e.g. Hz).  Default is 1000.
    bw : float, optional
        Fractional bandwidth in frequency domain of pulse (e.g. Hz).
        Default is 0.5.
    bwr : float, optional
        Reference level at which fractional bandwidth is calculated (dB).
        Default is -6.
    tpr : float, optional
        If `t` is 'cutoff', then the function returns the cutoff
        time for when the pulse amplitude falls below `tpr` (in dB).
        Default is -60.
    retquad : bool, optional
        If True, return the quadrature (imaginary) as well as the real part
        of the signal.  Default is False.
    retenv : bool, optional
        If True, return the envelope of the signal.  Default is False.

    Returns
    -------
    yI : ndarray
        Real part of signal.  Always returned.
    yQ : ndarray
        Imaginary part of signal.  Only returned if `retquad` is True.
    yenv : ndarray
        Envelope of signal.  Only returned if `retenv` is True.

    See Also
    --------
    scipy.signal.morlet

    Examples
    --------
    Plot real component, imaginary component, and envelope for a 5 Hz pulse,
    sampled at 100 Hz for 2 seconds:

    >>> import numpy as np
    >>> from scipy import signal
    >>> import matplotlib.pyplot as plt
    >>> t = np.linspace(-1, 1, 2 * 100, endpoint=False)
    >>> i, q, e = signal.gausspulse(t, fc=5, retquad=True, retenv=True)
    >>> plt.plot(t, i, t, q, t, e, '--')

    """
    if fc < 0:
        raise ValueError("Center frequency (fc=%.2f) must be >=0." % fc)
    if bw <= 0:
        raise ValueError("Fractional bandwidth (bw=%.2f) must be > 0." % bw)
    if bwr >= 0:
        raise ValueError("Reference level for bandwidth (bwr=%.2f) must "
                         "be < 0 dB" % bwr)

    # exp(-a t^2) <->  sqrt(pi/a) exp(-pi^2/a * f^2)  = g(f)

    ref = pow(10.0, bwr / 20.0)
    # fdel = fc*bw/2:  g(fdel) = ref --- solve this for a
    #
    # pi^2/a * fc^2 * bw^2 /4=-log(ref)
    a = -(pi * fc * bw) ** 2 / (4.0 * log(ref))

    if isinstance(t, str):
        if t == 'cutoff':  # compute cut_off point
            #  Solve exp(-a tc**2) = tref  for tc
            #   tc = sqrt(-log(tref) / a) where tref = 10^(tpr/20)
            if tpr >= 0:
                raise ValueError("Reference level for time cutoff must "
                                 "be < 0 dB")
            tref = pow(10.0, tpr / 20.0)
            return sqrt(-log(tref) / a)
        else:
            raise ValueError("If `t` is a string, it must be 'cutoff'")

    yenv = exp(-a * t * t)
    yI = yenv * cos(2 * pi * fc * t)
    yQ = yenv * sin(2 * pi * fc * t)
    if not retquad and not retenv:
        return yI
    if not retquad and retenv:
        return yI, yenv
    if retquad and not retenv:
        return yI, yQ
    if retquad and retenv:
        return yI, yQ, yenv

```


It means that,

$$
\text{Gaussian Pulse} = e^{-a t^2}
$$
$$
a = -\frac{\pi^2 \times {f_c}^2 \times {bw}^2}{4 \times \log(10^{\frac{bwr}{20}})}
$$


So, we can get the spectrum function like that:

```python
def gaussian_spcturm(f, fc, bw, bwr):
    
    ref = pow(10.0, bwr / 20.0)
    a = -(math.pi * fc * bw) ** 2 / (4.0 * math.log(ref))
    
    spectrum = np.exp(- (math.pi ** 2) * (2 * math.pi * f ** 2) / a)
    
    f_positive = f[f >= 0]
    f_negative = f[f < 0]
        
    spectrum_positive = np.exp(- (math.pi ** 2) * ((f_positive - fc) ** 2) / a)
    spectrum_negative = np.exp(- (math.pi ** 2) * ((f_negative + fc) ** 2) / a)
    spectrum_modu = np.concatenate((spectrum_negative, spectrum_positive))
    
    return spectrum, spectrum_modu
```
## Equation Detail Explain

In function, we don't need user to input $\sigma$, we want user to input fractional bandwidth and reference level at which fractional bandwidth is calculated. Using this two parameter, `bw` and `bwr`, the example is `bwr` = -3dB, we can calculate $\sigma$

So,
$$
B_{frac} = \frac{2f_{-3dB}}{f_{mod}}=\frac{\sqrt{ln(2)}}{\pi \cdot \sigma_T \cdot f_{mod}}
$$




# Reference

* https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.gausspulse.html
* https://dsp.stackexchange.com/questions/72497/fractional-bandwidth-of-a-gaussian-amplitude-modulated-signal
* https://mathworld.wolfram.com/FourierTransformGaussian.html