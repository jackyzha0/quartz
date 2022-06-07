# L15 Bernoulli, Uniform, Standard Normal (WMS 4.4-4.5)

Spiritual thought

1.  Dealing with disappointment

    -  In grad school, we took two years of courses, then two qualifying exams. If pass, four years of research; if fail, retake or exit with Masters degree. I prepped hard, but on day of exam, got hung up on one really hard question, lost track of time, didn't finish, and failed!

    -  I benefitted from a friend's experience, who had previously been preparing for graduation (robes, parents in town, etc.), when checked grades: E! Couldn't graduate.
		1.  First reaction: denial. Must be a mistake!
		2. Second reaction: blame. Grading is unfair!
		3. Third reaction: dejection. I'm a failure.
		4. Fourth reaction: hope. *I'm* not a failure, I just failed at this thing. I can move forward productively to the next step. Retook class, found a summer internship that turned out to be career altering.

    -  Scriptures
		1.  Joseph Smith in Liberty jail: "My son, peace be unto they soul; thine adversity and thine afflictions shall be but a small moment; and then, if thou endure it well, God shall exalt thee on high; thou shalt triumph over all thy foes" (D&C 121:7-8).
		2. "Search diligently, pray always, and be believing, and all things shall work together for your good, if ye walk uprightly and remember the covenant wherewith ye have covenanted one with another" (D&C 90:24).
		3. "...All things work together for good for them that love God..." (Romans 8:28).

    -  Midterm exam: If you performed less well than you hoped, press forward with a perfect brightness of hope! Help the Lord make it work toward your good.
		1.  Learn what went wrong (like spelling bee mistakes, may always remember). Final exam not cumulative per se, but does repeat concepts.
		2. Reassess study habits (e.g. understand every step of every question; don't just trust TA or study group).

2.  $X\sim$ Bernoulli($p$) (after Swiss mathematician Jacob Bernoulli, 1713)

    -  Recall cell phone use $P(X = x) =\{.7ifx = 0.3ifx = 1$

    -  Mean $E(X) = 0(.7) + 1(.3) = .3$

    -  Variance $V(X) = E(X^{2}) -\mu^{2} =\lbrack 0^{2}(.7) + 1^{2}(.3)\rbrack - {.3}^{2} = .21 =(.3)(.7)$

    -  Pattern: $E(X) = p$, $V(X) = p(1 - p)$ for "success" parameter $p$

3.  $X\sim$ Uniform($a,b$)

    -  $f(x) = k;a\leq x\leq b$

    -  $F(x) =\int_a^x\text{k}d\widetilde{x} =\ldots =\frac{x - a}{b - a};a\leq x\leq b$

    -  $\mu =\int_a^x\text{xf}(x)dx =\ldots =\frac{a + b}{2}$

    -  $\sigma^{2} = \int_a^xx^{2}f(x)dx -\mu^{2} =\ldots =\frac{(b - a)^{2}}{12}$

    -  Example: 90 second stop light
		1.  Average wait time $E(X) = 45$
		2. Standard deviation $\sigma =\sqrt{\frac{(90)^2}{12}}\approx 26$
		3. Wait less than 30 seconds with probability $F(30) =\frac{30 - 0}{90 - 0} =\frac{1}{3}$


1.  Standard normal $N(0,1)$

    -  $f(z) =\frac{1}{\sqrt{2\pi}}e^{-\frac{1}{2}z^{2}}$ (integrate using polar coordinates or trig substitutions)

    -  $E(Z) = \int_{-\infty}^{\infty}z\frac{1}{\sqrt{2\pi}}e^{-\frac{1}{2}z^{2}}dz =\ldots = 0$ (u substitution)

    -  $V(Z) = \int_{-\infty}^{\infty}z^{2}\frac{1}{\sqrt{2\pi}}e^{-\frac{1}{2}z^{2}}dz - 0^{2} =\ldots = 1$ (integration by parts)

    -  Practice reading Table A
		1.  Excel: NORM.S.DIST(x, cdf?) or NORM.S.INV(percentile)
		2. $P(- 1 < X < 1)\approx .68$
		3. $P(- 2 < X < 2)\approx .95$
		4. $P(- 3 < X < 3)\approx .997$

    -  Symmetric: $P(X < - 3) = P(X > 3)$