---
title: "Decisions Not Made: Owner Attention, the Intrinsic Value of Authority, and the Limits to Organizational Scale"
description: "A span-of-control model of delegation under limited owner attention, with authority rents, delegation capital and the scalability of business groups."
date: 2026-10-17
updated: 2026-10-18
type: working-paper
keywords:
  - delegation
  - span of control
  - managerial attention
  - decision rights
  - authority
  - business groups
  - firm growth
pdf: /research/decisions-not-made/Bulak_2026_Decisions-Not-Made_v1.1.pdf
zenodo: https://zenodo.org/records/23459504
doi: 10.5281/zenodo.23459504
seo:
  title: "Decisions Not Made: Owner Attention and Organizational Scale"
---

> *In the name of God, the Most Gracious, the Most Merciful.*

## Abstract

Owner-managed firms frequently stop growing well before technology, demand, or finance would require them to. This paper develops a span-of-control model in which the binding constraint is the owner's attention and the central choice is which decisions to stop making. Delegating a decision frees attention at the cost of an oversight requirement and a decision-quality loss. The optimal policy is a threshold rule: the owner delegates every decision whose delegation loss falls below the attention it frees, valued at the average return to the owner's time. Four further results follow. First, behavioral sources of under-delegation (an intrinsic value of authority and a salience-driven overweighting of delegation errors) are equivalent to a reduction in the perceived value of the business, and the authority rent distorts behavior only to the extent that oversight is costly. Second, under-delegation is first order for scale but second order for profit, so the owner's own profit signal provides weak feedback against it. Third, when delegation capability accumulates with use and depreciates with disuse, the model admits multiple steady states, and a myopic owner whose business remained small for long enough converges to the low-delegation steady state. Fourth, in a recursive hierarchy the returns to delegation compound across tiers, so a uniform under-delegation culture imposes losses that grow geometrically with the depth of a business group. An accounting identity yields an observable diagnostic: sustained growth without neglected decisions requires the number of decisions the owner no longer makes to grow faster than the portfolio itself.

**JEL codes:** D23, D91, L22, L25, M12, G34

**Keywords:** delegation, span of control, managerial attention, decision rights, authority, business groups, firm growth, organizational capability

*Use of generative AI.* The research question and the main ideas of this paper are the author's. Generative AI tools (Claude, Anthropic; ChatGPT, OpenAI) were used extensively in formalizing the model and the proofs, computing the numerical examples, preparing the references, typesetting, and writing the text; see the [Declaration on the Use of Generative AI](#declaration-on-the-use-of-generative-ai).


## 1. Introduction

A recurring observation about owner-managed firms is that their growth is limited less by markets than by their owners. In India and Mexico, plants grow far less with age than in the United States (Hsieh and Klenow, 2014), and field evidence attributes part of this pattern to the owner's reluctance or inability to pass decisions to others. In a management field experiment with large Indian textile firms, Bloom et al. (2013) report that owners did not trust non-family members with decision-making power, so that firms did not grow beyond the size that close family members could manage; the number of male family members explained firm size better than management practices did. Cross-country evidence relates decentralization to trust and links it to firm size (Bloom, Sadun, and Van Reenen, 2012), and quantitative work attributes a meaningful share of the gap in firm dynamics between developing and developed economies to limits on delegation (Akcigit, Alp, and Peters, 2021).

The canonical explanations for limited delegation are informational and contractual: agents are imperfectly aligned, contracts are incomplete, and institutions that would make outside managers reliable are weak. These explanations are important, but they leave a residual that is difficult to ignore. Experimental evidence shows that individuals attach intrinsic value to holding decision rights, over and above the instrumental value of the decisions themselves (Bartling, Fehr, and Herz, 2014; Owens, Grossman, and Fackler, 2014), that they forgo expected earnings to retain control over their own payoffs (Bobadilla-Suarez, Sunstein, and Sharot, 2017), and that authority affects behavior in ways that are not reducible to incentives (Fehr, Herz, and Wilkening, 2013). Psychological evidence documents an illusion of control, an expectancy of personal success that is inappropriately higher than the objective probability warrants (Langer, 1975), which suggests that owners may overestimate the advantage of making decisions themselves. Moreover, founders acquire their managerial habits while the firm is small, at a scale at which delegation is unnecessary, so these habits are formed under conditions that no longer hold once the firm grows.

This paper offers a tractable framework in which these forces can be analyzed jointly and compared with the standard instrumental motive. The framework builds on the span-of-control tradition (Lucas, 1978; Calvo and Wellisz, 1978; Rosen, 1982; Garicano, 2000) but shifts attention from the allocation of *talent* to the allocation of *decisions*. An owner endowed with a fixed amount of attention operates a portfolio of units, each of which generates a flow of decisions. Each decision can be made personally, which consumes a unit of attention, or delegated, which consumes a smaller amount of oversight attention and entails a decision-specific loss. Scale is then determined jointly by the owner's attention endowment and by the fraction of decisions the owner is willing to stop making.

The analysis yields five main results.

The first characterizes optimal delegation. The owner delegates according to a threshold rule, and the threshold has a simple interpretation: a decision is delegated whenever its delegation loss is smaller than the attention it frees, valued at the *average* product of the owner's attention. At small scale, when the owner's attention is not binding, the optimal policy is full control; delegation becomes valuable only once the attention constraint binds. The model thus describes a regime change: full control, which is optimal for a single establishment, becomes suboptimal once the owner's attention binds.

The second result concerns behavioral sources of under-delegation. I introduce two departures from profit maximization: an intrinsic utility from personally exercised authority, and a salience distortion that overweights the visible losses from delegated decisions relative to the invisible opportunity cost of the owner's time. Both distortions turn out to be equivalent to a reduction in the perceived value of the business, which yields simple comparative statics. In addition, the authority rent distorts delegation only to the extent that oversight of delegated decisions is costly. When oversight is free, the attention constraint already fixes the total number of decisions the owner can make personally, so the owner cannot consume more authority by delegating less. Improvements in monitoring technology therefore attenuate the behavioral distortion as well as the instrumental cost of delegation.

The third result is an asymmetry. Because the profit function is flat at the optimum while scale is strictly increasing in delegation, under-delegation produces first-order losses in scale but only second-order losses in profit. An owner who under-delegates runs a smaller organization that is nearly as profitable per unit of attention. The owner's own profit signal therefore supplies weak feedback against the habit, which helps explain why under-delegation can persist among owners who are otherwise disciplined by market outcomes.

The fourth result treats delegation as a capability. If the oversight cost of delegation declines with accumulated delegation experience and rises with disuse, the static model becomes a dynamic system with potentially multiple steady states. Owners whose early careers were spent in the small-scale regime, where full control is optimal, enter the growth phase with little delegation capital and may converge to a low-delegation steady state from which a myopic owner never escapes. Temporary shocks that force delegation, such as an owner's absence, can have permanent effects.

The fifth result extends the model to a recursive hierarchy, which is the natural representation of a business group or holding company. When each tier faces a delegation problem of the same form as the owner's, the gains from delegation multiply across tiers. A uniform behavioral distortion, interpreted as a managerial culture of under-delegation, therefore imposes losses that grow geometrically with organizational depth.

Finally, an accounting identity converts the model into a diagnostic. Holding the owner's attention fixed, the number of decisions the owner no longer makes must grow more than one-for-one with the number of units if the portfolio is to expand without decisions being neglected. Growth in the number of units that is not matched by growth in delegated decisions necessarily appears as a rising share of decisions that are neither made nor delegated. The number of decisions the owner has stopped making is therefore a more informative measure of organizational capacity than the number of firms the owner controls.

The remainder of the paper is organized as follows. Section 2 relates the paper to the literature. Section 3 presents the model and characterizes optimal delegation. Section 4 introduces behavioral distortions and derives the scale-profit asymmetry. Section 5 distinguishes delegation of objectives from prescription of solutions. Section 6 develops the dynamic model of delegation capability. Section 7 analyzes recursive hierarchies. Section 8 derives the diagnostic. Section 9 discusses empirical implications and measurement, and Section 10 concludes. Proofs are collected in Appendix A and details of the numerical illustrations in Appendix B.

## 2. Related Literature

The paper contributes to four strands of work.

**Span of control and hierarchies.** The idea that managerial capacity limits firm size goes back at least to Penrose (1959), and was formalized in models of hierarchical control and loss of control across layers (Williamson, 1967; Calvo and Wellisz, 1978), in the assignment of managerial talent to firm size (Lucas, 1978; Rosen, 1982), and in knowledge-based hierarchies in which problems are routed upward to those able to solve them (Garicano, 2000; Garicano and Rossi-Hansberg, 2006; see Garicano and Rossi-Hansberg, 2015, for a review). Related work studies hierarchies as structures for processing information under limited attention (Geanakoplos and Milgrom, 1991; Radner, 1993) and the allocation of organizational attention more generally (Dessein, Galeotti, and Santos, 2016; Halac and Prat, 2016; Dessein and Santos, 2021). Gumpert, Steimer, and Antoni (2022) show that a chief executive's time is shared across the establishments of a firm, so that frictions in one establishment affect the others; the owner's attention constraint in the present model has the same structure. Relative to this literature, the present model takes the owner's attention as the scarce input and makes the delegation margin, rather than the assignment of talent, the object of choice. Its tractability allows behavioral distortions, capability dynamics, and recursive structures to be analyzed within a single framework.

**The allocation of decision rights.** A large literature studies when a principal should delegate authority to a better-informed but imperfectly aligned agent (Holmström, 1984; Aghion and Tirole, 1997; Dessein, 2002; Alonso, Dessein, and Matouschek, 2008); Garicano and Rayo (2016) survey the ways in which the allocation of authority and other organizational choices can fail. These models typically consider a single decision and ask how much discretion to grant. The present model abstracts from the micro-foundations of the delegation loss and instead considers a continuum of heterogeneous decisions competing for a fixed stock of attention. The loss from delegating a given decision can be interpreted as the reduced form of any of these models. Section 5 draws on the distinction between formal and real authority (Aghion and Tirole, 1997) and between general and specific knowledge (Jensen and Meckling, 1992) to analyze the difference between delegating an objective and prescribing a solution.

**Behavioral organizational economics.** Experimental work documents that individuals value decision rights intrinsically (Bartling, Fehr, and Herz, 2014), are willing to pay a premium to retain control (Owens, Grossman, and Fackler, 2014; Bobadilla-Suarez, Sunstein, and Sharot, 2017), and that the delegation of authority affects effort on both sides of the relationship (Fehr, Herz, and Wilkening, 2013). Evidence on executive overconfidence (Malmendier and Tate, 2005) and on the persistent influence of individual managers on corporate policy (Bertrand and Schoar, 2003) points in the same direction. Recent evidence that controls for the instrumental benefits of choosing confirms that most people intrinsically prefer to choose, although a significant minority prefers not to (Freundt, Herz, and Kopp, 2026). The salience distortion in Section 4 is a reduced-form version of models in which choices overweight the payoffs or attributes that attract attention (Bordalo, Gennaioli, and Shleifer, 2012; Kőszegi and Szeidl, 2013). The present paper embeds two such preferences in a model of scale and shows that they have different comparative statics: the effect of the authority rent depends on the oversight cost and vanishes as oversight becomes free, while the effect of the salience distortion does not.

**Firm growth, family firms, and business groups.** The paper relates to empirical work on management practices (Bloom and Van Reenen, 2007), on the decentralization of decision making across countries (Bloom, Sadun, and Van Reenen, 2012), on managerial constraints in developing economies (Bloom et al., 2013; Akcigit, Alp, and Peters, 2021), on the slow growth of plants in developing economies (Hsieh and Klenow, 2014), on the persistence of management practices (Bloom et al., 2020), on the effects of managerial autonomy (Kala, 2024), on whether small-firm owners perform business tasks themselves or hire others to perform them (Anderson and McKenzie, 2022), on how CEOs allocate their time (Bandiera et al., 2018, 2020), and on family control (Bennedsen et al., 2007; Bertrand et al., 2008). It also relates to work on business groups and pyramidal ownership (Khanna and Yafeh, 2007; Almeida and Wolfenzon, 2006). Akcigit, Alp, and Peters (2021) is the closest contribution: they embed an owner's time constraint and costly outside managers in a quantitative model of firm dynamics. Grobovšek (2020) studies a related mechanism in which weak law enforcement allows middle managers to divert revenue, which limits delegation, firm size, and aggregate productivity. The present paper is complementary. It is qualitative and theoretical, it focuses on the owner's preferences over authority and on the dynamics of delegation capability, and it derives implications for the internal structure of multi-tier groups.

## 3. A Model of Delegation under an Attention Constraint

### 3.1. Environment

An owner is endowed with $T > 0$ units of attention per period. The owner operates $N \ge 0$ identical units (establishments, subsidiaries, or companies), and the number of profitable units available is bounded by $M > 0$, which summarizes the size of the market or the stock of investment opportunities. Each unit generates a gross surplus $V > 0$ per period, net of all costs other than those associated with decision making.

Each unit generates a unit mass of decisions per period. Decisions are indexed by $\ell \in [0, \bar\ell]$, which measures the loss in surplus incurred if the decision is delegated rather than made by the owner. The loss $\ell$ is distributed across decisions according to a continuous distribution $F$ with density $f > 0$ on $[0, \bar\ell]$. The loss captures, in reduced form, any combination of agent misalignment, inferior information, or inferior judgment relative to the owner. It is not necessary to take a position on its source.

Each decision can be handled in one of two ways.

- **Retention.** The owner makes the decision personally, consuming one unit of attention and incurring no loss.
- **Delegation.** The owner assigns the decision to a subordinate, consuming $s \in (0, 1)$ units of attention for selection, oversight, and review, and incurring the loss $\ell$.

The parameter $s$ is the oversight cost of delegation. It summarizes the quality of the owner's monitoring technology, reporting systems, and staff, and, in Section 6, the owner's accumulated delegation capability. The assumption $s < 1$ means that delegation saves attention; the assumption $s > 0$ means that delegation is never free.

A *delegation policy* is a measurable set $D \subseteq [0, \bar\ell]$ of decision types that are delegated in every unit. The owner chooses $N$ and $D$ to maximize total surplus

$$
\Pi = N \left( V - \int_D \ell \, dF(\ell) \right) \tag{1}
$$

subject to the attention constraint

$$
N \left( 1 - (1 - s) \int_D dF(\ell) \right) \le T, \tag{2}
$$

and the market constraint $N \le M$. I treat $N$ as continuous throughout.

### 3.2. The threshold structure

**Lemma 1 (Threshold policies).** *Any optimal delegation policy is, up to a set of measure zero, an interval $D = [0, \lambda]$ for some $\lambda \in [0, \bar\ell]$.*

Lemma 1 is a standard exchange argument: every delegated decision saves the same amount of attention, $1 - s$, so for any given delegation rate the owner should delegate the decisions with the smallest losses. The policy is therefore summarized by a single threshold $\lambda$. Define the *delegation rate* $\delta(\lambda) \equiv F(\lambda)$, the *attention requirement per unit*

$$
a(\lambda) \equiv 1 - (1 - s) F(\lambda), \tag{3}
$$

and the *expected delegation loss per unit*

$$
L(\lambda) \equiv \int_0^{\lambda} \ell \, dF(\ell). \tag{4}
$$

Note that $a$ is strictly decreasing and $L$ strictly increasing on $[0, \bar\ell]$, with $L'(\lambda) = \lambda f(\lambda)$.

### 3.3. Optimal delegation

When the attention constraint binds, $N = T / a(\lambda)$ and total surplus becomes

$$
\Pi(\lambda) = T \cdot \frac{V - L(\lambda)}{a(\lambda)}. \tag{5}
$$

The owner's problem is thus to maximize surplus per unit of attention, $\pi(\lambda) \equiv (V - L(\lambda)) / a(\lambda)$. Differentiating gives

$$
\pi'(\lambda) = \frac{f(\lambda)}{a(\lambda)^2} \, g(\lambda), \qquad g(\lambda) \equiv (1 - s)\big(V - L(\lambda)\big) - \lambda \, a(\lambda). \tag{6}
$$

A key property is that $g'(\lambda) = -a(\lambda) < 0$, so $g$ crosses zero at most once and $\pi$ is strictly quasi-concave. Let $\lambda^u$ denote the maximizer of $\pi$ on $[0, \bar\ell]$, the *unconstrained-market threshold*. Since $g(0) = (1 - s)V > 0$, we always have $\lambda^u > 0$, and $\lambda^u < \bar\ell$ if and only if

$$
(1 - s)\big(V - L(\bar\ell)\big) < s \, \bar\ell. \tag{7}
$$

I assume (7) throughout, so that it is never optimal to delegate everything.

**Proposition 1 (Optimal delegation).** *Let $N^u \equiv T / a(\lambda^u)$.*

1. *(Small scale.) If $M \le T$, the unique optimal policy is full control, $\lambda^* = 0$, with $N^* = M$.*
2. *(Attention-constrained scale.) If $M \ge N^u$, the optimal threshold is $\lambda^* = \lambda^u$, the unique solution of $g(\lambda) = 0$, and $N^* = N^u$.*
3. *(Intermediate scale.) If $T < M < N^u$, the optimal threshold is the unique $\lambda^M \in (0, \lambda^u)$ satisfying $T / a(\lambda^M) = M$, and $N^* = M$.*

*In the attention-constrained regime, the optimal threshold satisfies*

$$
\lambda^u = (1 - s) \cdot \frac{\Pi^u}{T}, \tag{8}
$$

*where $\Pi^u = \Pi(\lambda^u)$.*

Proposition 1 formalizes the regime change that motivates the paper. When the market is small relative to the owner's attention, every decision can be made personally, and since delegation entails a loss with no offsetting gain, full control is optimal. Delegation becomes valuable only when attention binds.

Equation (8) gives the threshold a transparent interpretation. Delegating a marginal decision frees $1 - s$ units of attention, and in the attention-constrained regime each unit of attention is worth $\Pi^u / T$, the *average* product of attention, because freed attention is redeployed to operating additional units at the optimal policy. The owner delegates every decision whose loss is smaller than the value of the attention it frees. Because $\Pi^u$ itself depends on the threshold, (8) is a fixed-point condition: the value of the owner's attention and the delegation policy are determined jointly.

### 3.4. Comparative statics and the scale ceiling

**Proposition 2 (Comparative statics).** *In the attention-constrained regime:*

1. *$\lambda^u$ is strictly decreasing in the oversight cost $s$.*
2. *$\lambda^u$ is strictly increasing in unit surplus $V$.*
3. *$\lambda^u$ is independent of $T$; scale $N^u$ and surplus $\Pi^u$ are proportional to $T$.*

Lower oversight costs raise delegation through two channels: each delegated decision frees more attention, and the value of each unit of freed attention rises. Higher unit surplus raises delegation because it raises the value of the attention released. Independence from $T$ reflects the constant-returns structure of the model: an owner with more attention operates proportionally more units at the same delegation rate.

**Corollary 1 (Scale ceiling).** *For any policy, $N \le T / a(\lambda) \le T / s$. Under full control, $N \le T$.*

An owner who delegates nothing can operate at most as many units as can be run with full personal attention. An owner who delegates everything is still bounded by the oversight requirement. Holding the oversight technology fixed, the ceiling $T/s$ can only be relaxed by changing the structure of the organization, which is the subject of Section 7.

## 4. Why Owners Under-Delegate

The model of Section 3 describes an owner who maximizes surplus. I now introduce two departures from this benchmark, motivated by the experimental and psychological evidence reviewed above, and a third, the role of small-scale history, which is developed more fully in Section 6.

### 4.1. Authority rents and salience

Suppose the owner maximizes the subjective objective

$$
W(\lambda) = N \Big[ V - (1 + \phi) L(\lambda) + b \big(1 - F(\lambda)\big) \Big], \tag{9}
$$

subject to the same constraints, where $b \ge 0$ and $\phi \ge 0$.

The parameter $b$ is an *authority rent*: a utility flow the owner derives from each decision made personally, independent of its consequences. It captures the intrinsic value of decision rights documented by Bartling, Fehr, and Herz (2014). The parameter $\phi$ is a *salience distortion*: the owner overweights the losses from delegated decisions, which are visible and attributable, relative to the opportunity cost of the attention those decisions would consume, which takes the form of units never operated and is therefore not observed. This is a reduced-form version of salience and focusing models, in which choices overweight the attributes that attract attention (Bordalo, Gennaioli, and Shleifer, 2012; Kőszegi and Szeidl, 2013). It is also related to the illusion of control (Langer, 1975): an owner who overestimates the quality of personally made decisions overweights the losses from delegation. An owner who is involved in every decision prevents small, observable mistakes and does not register the larger losses incurred through forgone scale.

I focus on the attention-constrained regime. Let $\lambda^\beta$ denote the threshold chosen by the behavioral owner.

**Proposition 3 (Behavioral under-delegation).**

1. *(Equivalence.) $\lambda^\beta$ coincides with the threshold that a surplus-maximizing owner would choose if unit surplus were*
$$
\hat V \equiv \frac{1}{1 + \phi} \left( V - \frac{b \, s}{1 - s} \right). \tag{10}
$$
2. *(Under-delegation.) If $\phi > 0$ or $b > 0$, then $\lambda^\beta < \lambda^u$, and hence the behavioral owner delegates less, operates fewer units, and earns lower surplus than the surplus-maximizing owner.*
3. *(Full control.) If $b \, s \ge (1 - s) V$, the behavioral owner retains every decision, $\lambda^\beta = 0$, regardless of the market size.*
4. *(Neutrality of the authority rent under costless oversight.) Suppose that (7) also holds at $s = 0$, that is, $V < L(\bar\ell)$. Then the effect of $b$ on $\lambda^\beta$ vanishes as $s \to 0$.*

The equivalence result says that both behavioral distortions act like a tax on the perceived value of the business. The salience distortion scales perceived value down proportionally. The authority rent enters as a subtraction whose size is proportional to $s/(1-s)$, the ratio of the attention a delegated decision still requires to the attention it saves.

To see the logic of Part 4, consider the total number of decisions the owner makes personally,

$$
R(\lambda) = N \big(1 - F(\lambda)\big) = T \cdot \frac{1 - F(\lambda)}{1 - (1 - s) F(\lambda)}. \tag{11}
$$

When $s = 0$, $R = T$ for every $\lambda$: the attention constraint fixes the number of personally made decisions at the owner's attention endowment, and delegation only determines how many units those decisions are spread over. The owner cannot consume more authority by delegating less; the only effect of retaining more decisions per unit is to operate fewer units. When $s > 0$, oversight of delegated decisions absorbs attention that would otherwise be spent making decisions, so delegation does reduce the owner's consumption of authority, and the authority rent bites. Improvements in monitoring and reporting technology therefore reduce behavioral under-delegation as well as its instrumental cost.

If the authority rent is a component of the owner's welfare, under-delegation is privately optimal: the owner consumes part of the return to the business in the form of authority. Proposition 3 then describes a distortion of firm value, not necessarily of owner welfare. The distinction matters for minority shareholders, employees, and creditors, and for the owner's heirs, whose preferences need not coincide with the founder's. The salience distortion, by contrast, is an error: an owner with $\phi > 0$ would, on reflection, prefer a different policy.

### 4.2. First-order losses in scale, second-order losses in profit

**Proposition 4 (Scale-profit asymmetry).** *Suppose $f$ is continuous at $\lambda^u$, and let $\lambda = \lambda^u - \Delta$ for small $\Delta > 0$. Then*

$$
\ln N(\lambda^u) - \ln N(\lambda) = \frac{(1 - s) f(\lambda^u)}{a(\lambda^u)} \, \Delta + o(\Delta), \tag{12}
$$

$$
\Pi(\lambda^u) - \Pi(\lambda) = \frac{T f(\lambda^u)}{2 \, a(\lambda^u)} \, \Delta^2 + o(\Delta^2). \tag{13}
$$

The asymmetry follows from the envelope theorem. At the optimum, the marginal decision's loss exactly offsets the value of the attention it frees, so a small deviation has no first-order effect on surplus. Scale, however, is strictly increasing in the delegation threshold, so the same deviation reduces the number of units operated at a first-order rate.

This result bears on the persistence of under-delegation. An owner who delegates too little operates a smaller organization that is almost as profitable per unit of attention as the optimal one. If owners learn about the quality of their managerial practices from realized profits, the feedback against under-delegation is weak: the profit signal of a small error is of the order of its square. In contrast, the owner perceives the losses from each delegated decision directly. The asymmetry between a weak, aggregated signal of the cost of control and a strong, disaggregated signal of the cost of delegation is one possible source of the salience distortion modeled above.

### 4.3. A numerical illustration

Table 1 illustrates the magnitudes. Losses are uniformly distributed on $[0, 2]$, and $V = T = 1$, so that an owner exercising full control operates one unit and earns surplus of one. Surplus is evaluated at true losses, so the entries measure firm value rather than the owner's subjective utility.

**Table 1. Optimal and behavioral delegation**

| $s$ | $\phi$ | $b$ | Threshold $\lambda$ | Delegation rate $\delta$ | Units $N$ | Surplus $\Pi$ |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 0.2 | 0 | 0 | 1.000 | 0.500 | 1.667 | 1.250 |
| 0.2 | 0.5 | 0 | 0.607 | 0.304 | 1.321 | 1.199 |
| 0.2 | 0 | 0.2 | 0.935 | 0.467 | 1.597 | 1.248 |
| 0.2 | 0.5 | 0.2 | 0.572 | 0.286 | 1.297 | 1.191 |
| 0.4 | 0 | 0 | 0.667 | 0.333 | 1.250 | 1.111 |
| 0.4 | 0.5 | 0 | 0.427 | 0.214 | 1.147 | 1.095 |
| 0.4 | 0 | 0.2 | 0.568 | 0.284 | 1.206 | 1.108 |
| 0.4 | 0.5 | 0.2 | 0.367 | 0.183 | 1.124 | 1.086 |

*Notes:* $\ell \sim U[0, 2]$, $V = T = 1$. Thresholds solve the first-order condition given in Appendix B; values were confirmed by direct numerical maximization of the subjective objective.

At $s = 0.2$, the surplus-maximizing owner operates two-thirds more units than an owner exercising full control and earns 25 percent more surplus. The scale-profit asymmetry of Proposition 4 holds even for large distortions: with $s = 0.2$ and both distortions active, the owner operates 22 percent fewer units than at the optimum but earns less than 5 percent less surplus. Finally, the same authority rent $b = 0.2$ lowers the delegation threshold by about 7 percent at $s = 0.2$ and by about 15 percent at $s = 0.4$, consistent with Proposition 3.

### 4.4. The legacy of small-scale success

Proposition 1 implies that the founder of a business that starts small optimally exercises full control during the early phase. If managerial practices are sticky, whether because of habit, because of the learning frictions implied by Proposition 4, or because delegation is itself a skill, an owner whose business outgrows the small-scale regime enters the attention-constrained regime with practices calibrated to conditions that no longer apply. Section 6 formalizes the case in which the friction is an accumulable capability.

## 5. Delegating Objectives versus Prescribing Solutions

The baseline model treats delegation as a binary choice. In practice, an owner can assign a decision to a subordinate while retaining control over its content, by specifying the action the subordinate should take. This section shows that such *prescriptive* delegation is, in the relevant cases, dominated, and that an owner who habitually prescribes operates as if oversight were more costly than it is.

Suppose each decision can be handled in one of three modes. Retention and delegation are as before. Under *prescription*, the owner formulates the solution and assigns only its execution to the subordinate. Formulating the solution requires $c \in (0, 1 - s)$ units of attention in addition to the oversight cost $s$, and the decision incurs a loss $\iota \ge 0$ that reflects the subordinate's specific knowledge left unused, in the sense of Jensen and Meckling (1992): the owner's solution is based on the owner's information, not the subordinate's. Delegation of the objective, by contrast, incurs the loss $\ell$, which now reflects only misalignment and errors of judgment.

In the attention-constrained regime, the owner maximizes surplus per unit of attention. Let $\mu > 0$ denote the maximal value of this ratio, which is the value of a unit of the owner's attention; in the baseline model, $\mu = \Pi^u / T$ by Proposition 1. At an optimum, each decision is handled in the mode that minimizes its loss plus $\mu$ times the attention it requires (see the proof of Proposition 5). The total cost of each mode is therefore $\mu$ for retention, $\mu s + \ell$ for delegation, and $\mu(s + c) + \iota$ for prescription.

**Proposition 5 (Prescription).** *In the attention-constrained regime:*

1. *Prescription is strictly cheaper than delegation if and only if $\ell > \iota + \mu c$, and strictly cheaper than retention if and only if $\mu(1 - s - c) > \iota$.*
2. *For decisions in which the subordinate has expertise, in the sense that the information loss from prescription is at least as large as the loss from delegation ($\iota \ge \ell$), prescription is strictly dominated by delegation.*
3. *Suppose that, out of habit, the owner prescribes a fraction $p \in (0, 1]$ of the decisions assigned to subordinates, independently of their type, and that prescribed decisions incur the same loss as delegated ones ($\iota = \ell$). Then the owner faces the baseline problem with oversight cost $s + p\,c$. By Proposition 2, such an owner chooses a lower delegation threshold, operates fewer units, and earns lower surplus than an owner who never prescribes. If $\iota \ge \ell$, surplus is lower still.*
4. *As $c \to 1 - s$, the attention saved by prescription relative to retention vanishes, and for any $\iota > 0$ prescription is strictly dominated by retention once $c$ is close enough to $1 - s$.*

Proposition 5 formalizes a familiar observation from management practice. An owner who specifies the objective and leaves the solution to the subordinate transfers most of the attention cost of the decision. An owner who specifies the solution continues to bear the cost of working out what should be done, and the organization does not use the subordinate's specific knowledge. When formulating a solution is nearly as costly as making the decision, prescription saves almost no attention relative to retention.

The static model understates the cost of prescription. In the framework of Aghion and Tirole (1997), an agent whose recommendations are routinely overridden has little incentive to acquire the information on which good recommendations depend. Habitual prescription may therefore erode the subordinate's specific knowledge and raise the losses from future delegation, shifting the distribution $F$ to the right over time. I do not model this mechanism, but it would reinforce the dynamics analyzed in the next section.

## 6. Delegation as Capital

The oversight cost $s$ has so far been treated as a fixed parameter. In practice, it depends on experience: selecting subordinates, specifying objectives, designing reporting, and calibrating trust are skills that improve with practice and decay with disuse. This section models the oversight cost as a function of accumulated delegation experience and shows that this generates path dependence.

### 6.1. Dynamics

Time is discrete. The owner's *delegation capital* $K_t \ge 0$ determines the oversight cost $s_t = \sigma(K_t)$, where $\sigma$ is continuous and strictly decreasing, with $\sigma(0) = \bar s < 1$ and $\lim_{K \to \infty} \sigma(K) = \underline s > 0$. Capital accumulates through use and depreciates at rate $\rho \in (0, 1)$:

$$
K_{t+1} = (1 - \rho) K_t + \delta_t, \tag{14}
$$

where $\delta_t$ is the delegation rate in period $t$. This is a learning-by-doing specification (Arrow, 1962) applied to the managerial function itself.

Throughout this section, I assume that (7) holds at $s = \underline s$, which implies that it holds for every $s \in [\underline s, \bar s]$, and, except where stated otherwise, that the market is large enough for the attention constraint to bind at every oversight cost in this range, $M \ge T / a(\lambda^u(\underline s))$.

I first consider a *myopic* owner who, in every period, chooses the static optimum given the current oversight cost: $\delta_t = \delta^*(\sigma(K_t))$, where $\delta^*(s) = F(\lambda^u(s))$. Define the map $\Phi(K) \equiv \delta^*(\sigma(K))$. By Proposition 2 and the monotonicity of $\sigma$, $\Phi$ is continuous and strictly increasing, with values in $(0, 1)$. Steady states solve

$$
\rho \, K = \Phi(K). \tag{15}
$$

**Proposition 6 (Path dependence).** *Let $G(K) \equiv \Phi(K) - \rho K$, and suppose that $G$ has finitely many zeros and changes sign at each of them.*

1. *At least one steady state exists, and every steady state lies in $(0, 1/\rho)$.*
2. *The number of steady states is odd. Ordered from smallest to largest, steady states alternate between locally stable ones, at which $\Phi$ crosses $\rho K$ from above, and unstable ones, at which it crosses from below; the smallest and the largest are stable. Multiple steady states require $\Phi(K_2) - \Phi(K_1) > \rho (K_2 - K_1)$ for some $K_1 < K_2$.*
3. *If there are several steady states, let $K_L$ be the smallest and $K^\dagger$ the second smallest, which is unstable. A myopic owner with $K_0 < K^\dagger$ converges to $K_L$.*
4. *Suppose that the market is small, $M \le T$, for the first $t_0$ periods and large, $M \ge T / a(\lambda^u(\underline s))$, thereafter. The owner chooses $\delta_t = 0$ during the small-scale phase, so delegation capital depreciates. If there are several steady states and $t_0$ is large enough, the owner converges to $K_L$.*
5. *If there are several steady states, a temporary shock that raises $K$ above $K^\dagger$, such as a period during which the owner is unable to make decisions personally, moves the owner permanently to a higher steady state.*

The condition in Part 2 requires the delegation rate to respond strongly to delegation capital over some range. This is the case when the returns to delegation experience are initially low and then accelerate, for example because the first delegated decisions are the hardest to monitor and the infrastructure of delegation (reporting systems, a trusted management team, routines for escalation) has fixed costs that are only recovered at scale. Conversely, if $\Phi$ never rises faster than $\rho K$, the steady state is unique.

### 6.2. An example

Let losses again be uniform on $[0, 2]$, with $V = T = 1$, and let $\sigma(K) = 0.15 + 0.75 / (1 + K^4)$ and $\rho = 0.25$. The system has three steady states, at $K \approx 0.20$, $0.99$, and $2.04$ (Figure 1). The outer two are stable; the middle one separates their basins of attraction.

<figure>
  <img src="/research/decisions-not-made/figure-1.svg" width="720" height="420" alt="Line chart of the delegation rate Φ(K) against delegation capital K, with the depreciation line ρK. The S-shaped curve crosses the line three times, at K ≈ 0.20, 0.99 and 2.04.">
  <figcaption><strong>Figure 1.</strong> Steady states of delegation capital in the example of Section 6.2. The solid curve is the delegation rate Φ(<i>K</i>) chosen by a myopic owner with delegation capital <i>K</i>; the dashed line is depreciation ρ<i>K</i>. Filled circles mark the stable steady states <i>K</i><sub>L</sub> ≈ 0.20 and <i>K</i><sub>H</sub> ≈ 2.04; the open circle marks the unstable steady state <i>K</i><sup>†</sup> ≈ 0.99.</figcaption>
</figure>

At the low steady state, the oversight cost is approximately 0.90, the owner delegates about 5 percent of decisions, operates about 1.01 units, and earns surplus of about 1.00, which is virtually indistinguishable from full control. At the high steady state, the oversight cost is approximately 0.19, the owner delegates about 51 percent of decisions, operates 1.70 units, and earns surplus of about 1.26. The two owners have the same preferences, attention, market, and technology; they differ only in their initial delegation capital.

An owner starting with $K_0 = 0$, which is the relevant initial condition for a founder whose business remained small for a long period (Proposition 6, Part 4), converges to the low steady state. A one-time increase in delegation sufficient to raise $K$ above $K^\dagger \approx 0.99$ moves the same owner permanently to the high steady state.

### 6.3. Forward-looking owners and awareness

A forward-looking owner recognizes that delegation today lowers oversight costs tomorrow. By the envelope theorem, maximal surplus per unit of attention is decreasing in the oversight cost, $d\pi^*/ds = -(V - L(\lambda^u)) F(\lambda^u) / a(\lambda^u)^2 < 0$, so the owner's continuation value is increasing in $K$, and a forward-looking owner has a motive to delegate beyond the static optimum. I do not characterize the forward-looking problem formally. Whether a sufficiently patient owner avoids the low steady state depends on how strongly $\sigma$ responds to $K$ and on the discount factor, and is left for future work.

Escaping the low steady state requires the owner to delegate beyond the static optimum, which in turn requires recognizing that the attention constraint binds. The salience distortion of Section 4 and the weak profit feedback of Proposition 4 both make this recognition less likely.

## 7. Holdings as Recursive Delegation

The ceiling $N \le T/s$ of Corollary 1 binds any owner who oversees operating units directly. Business groups relax it by interposing layers of managers, each of whom faces a delegation problem of the same form. This section shows that the returns to delegation then compound.

### 7.1. A recursive hierarchy

Let tier-0 nodes be operating units with value $v_0 = V$. A tier-$k$ node, for $k = 1, \dots, K$, is a manager endowed with attention $T$ who oversees $n_k$ tier-$(k-1)$ nodes. Each subordinate node generates a unit mass of decisions requiring the tier-$k$ manager's involvement: appointments, budgets, capital allocation, and the resolution of exceptions. If a decision of type $\ell$ is delegated to the subordinate, the loss is $\ell \, v_{k-1}$; that is, the stakes of decisions scale with the value of the node they concern. Losses are distributed according to $F$ as before. The owner sits at tier $K$. Given threshold $\lambda_k$ at tier $k$, the attention constraint binds with $n_k = T / a(\lambda_k)$, and

$$
v_k = n_k \, v_{k-1} \big(1 - L(\lambda_k)\big) = v_{k-1} \, \gamma(\lambda_k), \qquad \gamma(\lambda) \equiv \frac{T \big(1 - L(\lambda)\big)}{a(\lambda)}. \tag{16}
$$

**Proposition 7 (Compounding).**

1. *The value of the group is $v_K = V \prod_{k=1}^K \gamma(\lambda_k)$, and the optimal threshold is the same at every tier, $\lambda_k = \lambda^\circ$, where $\lambda^\circ$ is the solution of the baseline problem with $V = 1$.*
2. *Relative to a group in which every tier exercises full control, the gain from optimal delegation is $\big[(1 - L(\lambda^\circ)) / a(\lambda^\circ)\big]^K$, which grows geometrically in the number of tiers.*
3. *If every tier is subject to the same behavioral distortion and chooses $\lambda^\beta < \lambda^\circ$, the group's value relative to the optimum is $\big[\gamma(\lambda^\beta) / \gamma(\lambda^\circ)\big]^K$, which declines geometrically in the number of tiers.*

The multiplicative structure follows from the scale invariance of decision stakes: each tier solves the same normalized problem, and its delegation policy multiplies the value of everything below it.

Behavioral under-delegation is correspondingly more costly in deeper groups. Using the parameters of Table 1 with $s = 0.2$, $\phi = 0.5$, and $b = 0.2$ applied at every tier (with $b$ measured in units of subordinate value), the loss relative to the optimum is 4.7 percent with one tier, 9.3 percent with two, 13.6 percent with three, and 17.7 percent with four.

### 7.2. Remarks

The frictionless version above abstracts from managerial compensation. Suppose that every manager other than the owner receives a wage $w$, and consider adding a tier at the top of a group of depth $K \ge 1$ in which every tier uses threshold $\lambda$. The owner of the deeper group oversees $n = T/a(\lambda)$ copies of the existing group, whose former owners become salaried managers. The value of the group rises from $V\gamma(\lambda)^K$ to $V\gamma(\lambda)^{K+1}$, and the number of salaried managers rises by $n^K$. Since $\gamma(\lambda)/n = 1 - L(\lambda)$, the additional tier raises value net of wages if and only if

$$
V \big(1 - L(\lambda)\big)^K \big(\gamma(\lambda) - 1\big) > w.
$$

Under-delegation affects this condition through two opposing channels. A lower threshold reduces $\gamma(\lambda)$, the gross return to an additional tier, but it also reduces $L(\lambda)$, so that value per operating unit declines more slowly with depth. In the example above, the left-hand side is larger under the optimal threshold for $K = 1$ and larger under the behavioral threshold for $K \ge 2$ (Appendix B). The model therefore does not imply that under-delegating groups are shallower; it implies that, at a given depth, they are worth less.

The scale invariance of decision stakes is the assumption that delivers exact compounding. If stakes grow less than proportionally with node value, for example because higher tiers make more standardized decisions, the effect of delegation at higher tiers is attenuated, but the qualitative conclusion that delegation at each tier multiplies the value of the structure below it is preserved.

## 8. A Diagnostic: Decisions No Longer Made

The model suggests that the number of units an owner controls is an incomplete and potentially misleading indicator of organizational capacity. This section derives an accounting relationship that makes the point precise and suggests an observable alternative.

Allow the owner to operate more units than the attention constraint permits, $N > T / a(\lambda)$. Some decisions are then neither made by the owner nor delegated: they are *neglected*, resolved by default, by inertia, or by whoever happens to be present, without either the owner's judgment or an explicit assignment of authority. For each unit, let $\delta$ be the fraction of decisions delegated, $m$ the fraction made personally by the owner, and $\nu$ the fraction neglected, so that $\delta + m + \nu = 1$. Attention requires $N(m + s\delta) \le T$.

**Proposition 8 (Accounting).** *For any $N > 0$,*

$$
\nu \;\ge\; 1 - (1 - s)\,\delta - \frac{T}{N}. \tag{17}
$$

*Consequently:*

1. *Zero neglect requires a delegation rate of at least*
$$
\delta_{\min}(N) = \frac{1 - T/N}{1 - s}. \tag{18}
$$
2. *The number of decisions the owner no longer makes, $N\delta$, must satisfy*
$$
N \delta \;\ge\; \frac{N - T}{1 - s}, \tag{19}
$$
*which increases in $N$ with slope $1/(1-s) > 1$.*
3. *If $N$ rises while $\delta$ is held fixed, the lower bound on the neglect rate $\nu$ rises.*

Part 2 is the central diagnostic. Each additional unit in the portfolio must be accompanied by more than one additional unit of decisions that the owner has stopped making, because delegated decisions still absorb oversight. With $s = 0.2$ and $T = 1$, an owner operating two units must delegate at least 62.5 percent of decisions to avoid neglect, an owner operating three units at least 83 percent, and no owner can operate more than five.

Part 3 applies to an owner who acquires companies without changing how they are run. If $N$ rises while $\delta$ does not, inequality (17) implies that the additional decisions are neglected. For this reason, the number of decisions the owner no longer makes, $N\delta$, is a more informative measure of organizational capacity than the number of companies the owner controls.

## 9. Empirical Implications and Measurement

The model generates several predictions that are, in principle, testable with existing types of data.

**P1 (Monitoring technology).** Holding firm size and sector fixed, delegation rates should be higher where the oversight cost of delegation is lower, for instance after the adoption of reporting, workflow, or enterprise software that makes delegated decisions observable at low cost (Proposition 2).

**P2 (Interaction of authority rents and oversight costs).** Proxies for owners' intrinsic preference for control should predict under-delegation more strongly where oversight is costly, and the predictive power should decline after improvements in monitoring technology (Proposition 3, Part 4). This interaction distinguishes the authority-rent channel from purely instrumental explanations of under-delegation, which predict no such pattern.

**P3 (Hysteresis).** Conditional on current size and fundamentals, owners who spent longer in the small-scale regime should delegate less. Exogenous temporary absences of the owner, for example due to illness or extended travel, should be followed by persistent increases in delegation and in scale when they are long enough to move delegation capital past the unstable steady state (Proposition 6).

**P4 (Scale-profit asymmetry).** Cross-sectional dispersion in delegation should be associated with substantially larger dispersion in scale than in surplus per unit of owner attention (Proposition 4).

**P5 (Depth of business groups).** Holding depth fixed, the value loss associated with under-delegation at intermediate tiers should be larger in deeper groups (Proposition 7). The model does not predict a monotone relationship between delegation and depth (Section 7.2).

**Measurement.** The key primitives of the model can be measured more directly than is often assumed. Time-use surveys and diaries of chief executives (Bandiera et al., 2018, 2020) measure the allocation of owner attention. Survey instruments on the decentralization of decision rights (Bloom, Sadun, and Van Reenen, 2012) measure the delegation rate $\delta$ for specific classes of decisions. Increasingly, the decision flow itself is recorded: the task-tracking, request, and approval systems used by multi-establishment firms log who initiated each request, who resolved it, and how often it was escalated. Such records permit direct measurement of the three quantities in (17): decisions retained by the owner, decisions delegated, and decisions left unresolved. They also permit estimation of the oversight cost $s$, as the owner's time spent reviewing delegated decisions relative to the time required to make them.

**Identification.** The principal empirical challenge is that delegation and scale are jointly determined. The model suggests sources of variation that shift the oversight cost without directly affecting demand, such as the staggered adoption of monitoring technology, and sources that shift delegation capital without directly affecting current fundamentals, such as exogenous owner absences.

## 10. Conclusion

This paper has studied delegation as the allocation of a fixed stock of attention across a continuum of decisions. The model brings together several mechanisms that are familiar from practice: full control is optimal at small scale and becomes the binding constraint at large scale; a preference for authority and an overweighting of visible delegation errors act as a tax on the perceived value of the business; under-delegation is costly for scale but nearly costless for profit, and is therefore weakly disciplined by the owner's own experience; delegation capability is accumulated through use, so that small-scale histories can produce persistent traps; and in multi-tier organizations the returns to delegation compound, so that under-delegation is most costly in the deepest organizations.

Several extensions are natural. The units in the model are homogeneous and the distribution of delegation losses is exogenous. Allowing the owner to invest in the quality of subordinates, and thereby to shift $F$, would connect the model to the literature on managerial talent and to the endogenous formation of management teams. The attention endowment is fixed; in practice, owners can expand it through staff, deputies, or co-owners, each of whom raises the issues analyzed here at one remove. The dynamic analysis considers a myopic owner and characterizes the forward-looking case only qualitatively. A full dynamic treatment, together with heterogeneity in owner preferences, would allow the model to be taken to firm-level data on growth and organizational structure.

More broadly, the results suggest that the scale an owner-managed organization can reach depends on the owner's delegation policy as well as on its assets, markets, and access to finance. Measuring that policy directly, through the decisions the owner no longer makes, is a promising direction for empirical work.

## Declaration on the Use of Generative AI

The research question and the main ideas of this paper are the author's: owner attention as the binding constraint on scale, the intrinsic value of authority as a source of under-delegation, delegation capability as a stock that accumulates with use and depreciates with disuse, the compounding of delegation across the tiers of a business group, and the number of decisions the owner no longer makes as a measure of organizational capacity. The author used generative AI tools, Claude (Anthropic) and ChatGPT (OpenAI), extensively in all other stages of the work: formalizing the model, deriving and checking the propositions and their proofs, computing the numerical examples, searching for and formatting references, typesetting the paper in LaTeX, and drafting and editing the text. Version 1.1 was prepared with Claude, which was used to re-check the proofs and numerical results, correct the errors found in version 1.0, check the references against their published versions, and revise the exposition. The author has reviewed the final text and takes full responsibility for its content, including any remaining errors.

## Appendix A. Proofs

**Proof of Lemma 1.** Fix any measurable delegation set $D$ with $F$-measure $\delta = \int_D dF$. The attention requirement per unit, $1 - (1-s)\delta$, depends on $D$ only through $\delta$. Let $\lambda$ satisfy $F(\lambda) = \delta$ and set $D' = [0, \lambda]$. For any $D$ with the same measure, $\int_{D \setminus D'} dF = \int_{D' \setminus D} dF$, and every $\ell \in D \setminus D'$ satisfies $\ell \ge \lambda$ while every $\ell \in D' \setminus D$ satisfies $\ell \le \lambda$. Hence $\int_D \ell \, dF \ge \int_{D'} \ell \, dF$, with strict inequality whenever $D$ and $D'$ differ on a set of positive measure, since $f > 0$. Replacing $D$ with $D'$ therefore weakly raises surplus for given $N$ and leaves the attention constraint unchanged. $\square$

**Proof of Proposition 1.** By Lemma 1, the owner chooses $(N, \lambda)$ to maximize $N(V - L(\lambda))$ subject to $N a(\lambda) \le T$ and $N \le M$.

*Part 1.* Since $L \ge 0$ and $N \le M$, surplus is at most $MV$. If $M \le T$, the pair $(N, \lambda) = (M, 0)$ is feasible because $a(0) = 1$, and attains $MV$. Any $\lambda > 0$ yields $L(\lambda) > 0$ and therefore surplus strictly below $MV$ for every feasible $N$.

*Parts 2 and 3.* Let $M > T$. At an optimum, at least one constraint binds; otherwise $N$ could be increased. If $N < M$, the attention constraint binds and $N = T / a(\lambda)$, so surplus is $\Pi(\lambda) = T \pi(\lambda)$. Differentiating $\pi(\lambda) = (V - L(\lambda))/a(\lambda)$, using $L' = \lambda f$ and $a' = -(1-s) f$, gives

$$
\pi'(\lambda) = \frac{-\lambda f(\lambda) \, a(\lambda) + (1-s) f(\lambda) \big(V - L(\lambda)\big)}{a(\lambda)^2} = \frac{f(\lambda)}{a(\lambda)^2} \, g(\lambda).
$$

Moreover, $g'(\lambda) = -(1-s)\lambda f(\lambda) - a(\lambda) + (1-s)\lambda f(\lambda) = -a(\lambda) < 0$. Since $g(0) = (1-s)V > 0$ and, under (7), $g(\bar\ell) = (1-s)(V - L(\bar\ell)) - s\bar\ell < 0$, $g$ has a unique root $\lambda^u \in (0, \bar\ell)$, at which $\pi$ attains its unique maximum; $\pi$ is strictly increasing on $[0, \lambda^u]$ and strictly decreasing on $[\lambda^u, \bar\ell]$.

The scale $T/a(\lambda)$ is strictly increasing in $\lambda$. If $T/a(\lambda^u) \le M$, the policy $(N^u, \lambda^u)$ is feasible and attains the maximum of $T\pi(\lambda)$, which is an upper bound on surplus whenever the attention constraint binds; any policy at which only the market constraint binds is dominated, because with slack attention at $N = M$ the owner's surplus $M(V - L(\lambda))$ is at most $T\pi(\lambda) \cdot M a(\lambda)/T < T\pi(\lambda) \le T\pi(\lambda^u)$. This establishes Part 2.

If $T < M < T/a(\lambda^u)$, there is a unique $\lambda^M \in (0, \lambda^u)$ with $T / a(\lambda^M) = M$. For $\lambda \le \lambda^M$, the attention constraint binds and surplus $T\pi(\lambda)$ is increasing in $\lambda$. For $\lambda > \lambda^M$, the market constraint binds, $N = M$, and surplus $M(V - L(\lambda))$ is strictly decreasing in $\lambda$. Hence $\lambda^M$ is optimal. This establishes Part 3.

*Equation (8).* At $\lambda^u$, $g(\lambda^u) = 0$ implies $\lambda^u = (1-s)(V - L(\lambda^u))/a(\lambda^u) = (1-s)\pi(\lambda^u) = (1-s)\Pi^u/T$. $\square$

**Proof of Proposition 2.** The threshold $\lambda^u$ is defined by $g(\lambda; s, V) = 0$ with $g_\lambda = -a < 0$. Using $\partial a/\partial s = F(\lambda)$,

$$
\frac{\partial g}{\partial s} = -\big(V - L(\lambda)\big) - \lambda F(\lambda), \qquad \frac{\partial g}{\partial V} = 1 - s > 0.
$$

At $\lambda = \lambda^u$, $g = 0$ implies $(1-s)(V - L(\lambda^u)) = \lambda^u a(\lambda^u) > 0$, so $\partial g / \partial s < 0$. By the implicit function theorem, $d\lambda^u/ds = -g_s/g_\lambda < 0$ and $d\lambda^u/dV = -g_V/g_\lambda > 0$. Since $T$ does not enter $g$, $\lambda^u$ is independent of $T$, and $N^u = T/a(\lambda^u)$ and $\Pi^u = T\pi(\lambda^u)$ are proportional to $T$. $\square$

**Proof of Corollary 1.** The attention constraint implies $N \le T/a(\lambda)$, and $a(\lambda) \ge a(\bar\ell) = s$. Under full control, $a(0) = 1$. $\square$

**Proof of Proposition 3.** In the attention-constrained regime, the behavioral owner maximizes $T \, U(\lambda)/a(\lambda)$ with $U(\lambda) = V - (1 + \phi)L(\lambda) + b(1 - F(\lambda))$. Since $U'(\lambda) = -[(1+\phi)\lambda + b] f(\lambda)$, the derivative of $U/a$ has the sign of

$$
-\big[(1+\phi)\lambda + b\big] a(\lambda) + (1 - s) U(\lambda).
$$

Expanding and using $(1-s)(1 - F) - a = -s$,

$$
\begin{aligned}
&(1-s)U(\lambda) - b\,a(\lambda) - (1+\phi)\lambda a(\lambda) \\
  &\qquad = (1 - s)\big[V - (1+\phi)L(\lambda)\big] - b s - (1 + \phi) \lambda a(\lambda) \equiv h(\lambda).
\end{aligned}
$$

Dividing by $1 + \phi$,

$$
\frac{h(\lambda)}{1+\phi} = (1 - s)\big[\hat V - L(\lambda)\big] - \lambda a(\lambda),
$$

with $\hat V$ as in (10). This is the function $g$ with $V$ replaced by $\hat V$, which proves Part 1. As in the proof of Proposition 1, $h' = -(1+\phi)a < 0$.

For Part 2, evaluate $h$ at $\lambda^u$. Since $g(\lambda^u) = 0$, $(1-s)L(\lambda^u) + \lambda^u a(\lambda^u) = (1-s)V$, hence

$$
h(\lambda^u) = (1-s)V - (1+\phi)(1-s)V - bs = -\phi(1-s)V - bs,
$$

which is strictly negative if $\phi > 0$ or $b > 0$ (recall $s > 0$). Since $h$ is strictly decreasing, $\lambda^\beta < \lambda^u$. Because $\pi$ is strictly increasing on $[0, \lambda^u]$ and $N = T/a(\lambda)$ is strictly increasing, both true surplus and scale are strictly lower at $\lambda^\beta$.

For Part 3, $h(0) = (1+\phi)(1-s)\hat V$, which is non-positive if and only if $bs \ge (1-s)V$. In that case $h < 0$ on $(0, \bar\ell]$, so the subjective objective is strictly decreasing and $\lambda^\beta = 0$. Since the subjective objective at $\lambda = 0$ is independent of $M$ whenever $M \ge T$, and full control is optimal for $M \le T$ by Proposition 1, the conclusion holds for every market size.

For Part 4, suppose $V < L(\bar\ell)$. At $s = 0$, $g(0) = V > 0$ and $g(\bar\ell) = V - L(\bar\ell) < 0$, so $g$ has a root $\lambda^u(0) \in (0, \bar\ell)$, at which $V - L(\lambda^u(0)) = \lambda^u(0)\big(1 - F(\lambda^u(0))\big) > 0$. Since $g$ is affine in $s$ with slope $-[V - L(\lambda) + \lambda F(\lambda)]$, which is negative at $\lambda = \lambda^u(0)$, we have $g(\lambda^u(0)) < 0$ for every $s > 0$, and hence $\lambda^u(s) < \lambda^u(0)$. Fix $\phi$, and write $h_b$ for the function $h$ with authority rent $b$, so that $h_b = h_0 - bs$. For $s$ small enough that $(1-s)V > bs$, we have $h_b(0) > 0$, and $h_b(\bar\ell) \le (1-s)(V - L(\bar\ell)) - s\bar\ell < 0$; hence the roots $\lambda_0$ of $h_0$ and $\lambda_b$ of $h_b$ are interior, with $\lambda_b \le \lambda_0 \le \lambda^u(s) < \lambda^u(0)$ by Part 2. Then

$$
bs = h_0(\lambda_b) - h_0(\lambda_0) = (1+\phi) \int_{\lambda_b}^{\lambda_0} a(x) \, dx \;\ge\; (1+\phi)\big(1 - F(\lambda^u(0))\big)(\lambda_0 - \lambda_b),
$$

because $a(x) \ge 1 - F(x) \ge 1 - F(\lambda^u(0))$ for $x \le \lambda^u(0)$. Hence

$$
0 \le \lambda_0 - \lambda_b \le \frac{b\,s}{(1+\phi)\big(1 - F(\lambda^u(0))\big)},
$$

which tends to zero as $s \to 0$. Equation (11) follows from $N = T/a(\lambda)$. $\square$

**Proof of Proposition 4.** For (12), $\ln N(\lambda) = \ln T - \ln a(\lambda)$, so $d \ln N/d\lambda = (1-s) f(\lambda)/a(\lambda)$, which is continuous at $\lambda^u$; a first-order expansion gives (12). For (13), write

$$
\Pi(\lambda^u) - \Pi(\lambda^u - \Delta) = T \int_{\lambda^u - \Delta}^{\lambda^u} \frac{f(x)}{a(x)^2} \, g(x) \, dx.
$$

Since $g(\lambda^u) = 0$ and $g$ is continuously differentiable with $g' = -a$, $g(x) = a(\lambda^u)(\lambda^u - x) + o(\lambda^u - x)$. By continuity of $f$ and $a$ at $\lambda^u$, the integrand equals $\frac{f(\lambda^u)}{a(\lambda^u)}(\lambda^u - x) + o(\lambda^u - x)$. Integrating gives $\frac{T f(\lambda^u)}{2a(\lambda^u)}\Delta^2 + o(\Delta^2)$. $\square$

**Proof of Proposition 5.** In the attention-constrained regime, the owner assigns a mode to each decision type so as to maximize surplus per unit of attention, $(V - \bar L)/\bar A$, where $\bar L$ and $\bar A$ are the expected loss and the expected attention requirement per unit under the assignment. Let $\mu$ be the maximal value of this ratio. For every assignment, $V - \bar L - \mu \bar A \le 0$, with equality at an optimum. An optimal assignment therefore maximizes $V - \bar L - \mu \bar A$, that is, it minimizes the loss plus $\mu$ times the attention requirement decision by decision, up to a set of measure zero. This justifies the cost comparison in the text.

Parts 1 and 2 follow from comparing $\mu(s + c) + \iota$ with $\mu s + \ell$ and with $\mu$: prescription is strictly cheaper than delegation if and only if $\ell > \iota + \mu c$, which is impossible when $\iota \ge \ell$ because $\mu c > 0$, and strictly cheaper than retention if and only if $\mu(1 - s - c) > \iota$.

For Part 3, suppose that a fraction $p$ of the decisions assigned to subordinates is prescribed independently of $\ell$ and that $\iota = \ell$. Each assigned decision then consumes on average $s + pc$ units of attention and incurs the loss $\ell$, so the attention requirement per unit is $1 - (1 - s - pc)F(\lambda)$ and the expected loss per unit is $L(\lambda)$. This is the baseline problem with oversight cost $s' = s + pc$, and $s' \in (s, 1)$ because $c < 1 - s$. By Proposition 2, the optimal threshold $\lambda'$ for oversight cost $s'$ satisfies $\lambda' < \lambda^u(s)$. Scale is lower because $(1 - s')F(\lambda') < (1 - s)F(\lambda^u(s))$, so the attention requirement per unit is higher. Surplus is lower because, for every $\lambda > 0$, surplus per unit of attention is strictly decreasing in the oversight cost. If $\iota \ge \ell$ on the prescribed set, the expected loss per unit is weakly higher for every $\lambda$, so maximal surplus is weakly lower still.

Part 4 follows from Part 1: as $c \to 1 - s$, $\mu(1 - s - c) \to 0$, so for any $\iota > 0$ prescription is strictly dominated by retention once $c$ is close enough to $1 - s$. $\square$

**Proof of Proposition 6.** *Part 1.* $\Phi$ is continuous on $[0, \infty)$ with values in $(0, 1)$, because $0 < \lambda^u(s) < \bar\ell$ for every $s \in [\underline s, \bar s]$ and $f > 0$. Hence $G(0) = \Phi(0) > 0$, and $G(K) < 1 - \rho K \le 0$ for $K \ge 1/\rho$. By the intermediate value theorem, $G$ has a root in $(0, 1/\rho)$, and every root lies in this interval.

*Part 2.* The dynamics are $K_{t+1} = H(K_t)$, with $H(K) \equiv (1-\rho)K + \Phi(K) = K + G(K)$ continuous and strictly increasing. If $K_1 \ge K_0$, then $K_{t+1} \ge K_t$ for all $t$ by induction, and similarly with the inequalities reversed, so every trajectory is monotone. Trajectories are bounded, since $K_t \le \max\{K_0, 1/\rho\}$, and therefore converge, by continuity of $H$, to a steady state.

Since $G$ is positive at $0$, negative on $[1/\rho, \infty)$, and changes sign at each of its finitely many zeros, the sign of $G$ alternates between consecutive zeros, the number of zeros is odd, and $G$ changes sign from positive to negative at the smallest and at the largest zero. Let $K^*$ be a zero at which $G$ changes sign from positive to negative, and let $K$ lie between $K^*$ and the adjacent zero below it (or $0$). Then $G(K) > 0$ and $H(K) < H(K^*) = K^*$, so the trajectory from $K$ increases, remains below $K^*$, and converges to a steady state in $(K, K^*]$, which can only be $K^*$. The argument for $K$ slightly above $K^*$ is symmetric, so $K^*$ is locally stable. At a zero where $G$ changes sign from negative to positive, the same argument shows that trajectories starting nearby move away from it, so the steady state is unstable.

Finally, if there are at least two steady states, $G$ is negative at some $K_1$ between the smallest and the second smallest zero and positive at some $K_2$ just above the second smallest zero. Then $G(K_2) > G(K_1)$, that is, $\Phi(K_2) - \Phi(K_1) > \rho(K_2 - K_1)$.

*Part 3.* On $[0, K_L)$, $G > 0$, so a trajectory starting there increases and, since $H(K) < H(K_L) = K_L$, remains below $K_L$; it converges to a steady state in $(K_0, K_L]$, which is $K_L$. On $(K_L, K^\dagger)$, $G < 0$, so a trajectory starting there decreases and, since $H(K) > H(K_L) = K_L$, remains above $K_L$; it converges to $K_L$.

*Part 4.* While $M \le T$, Proposition 1 implies full control, $\delta_t = 0$, so $K_{t_0} = (1-\rho)^{t_0} K_0$. For $t_0$ large enough, $K_{t_0} < K^\dagger$, and Part 3 applies from period $t_0$ onward.

*Part 5.* Suppose a shock moves capital to $K' > K^\dagger$. Since $H(K) > H(K^\dagger) = K^\dagger$ for $K > K^\dagger$, the subsequent trajectory remains above $K^\dagger$. If $G(K') \ge 0$, the trajectory is nondecreasing and converges to a steady state at or above $K'$. If $G(K') < 0$, let $K_s$ be the largest zero of $G$ below $K'$; since $G > 0$ just above $K^\dagger$, $K_s > K^\dagger$. The trajectory decreases, remains above $K_s$ because $H(K) > H(K_s) = K_s$ for $K > K_s$, and converges to $K_s$. In either case the limit exceeds $K^\dagger > K_L$. $\square$

**Proof of Proposition 7.** Equation (16) gives $v_K = V\prod_k \gamma(\lambda_k)$. Since each factor depends only on its own threshold and all factors are positive, the product is maximized by maximizing each factor separately. Each factor equals $T(1 - L(\lambda))/a(\lambda)$, which is $T$ times the baseline objective $\pi$ with $V = 1$, so the maximizer is $\lambda^\circ$ at every tier. Under full control, $\gamma(0) = T$, so the ratio of optimal to full-control value is $[\gamma(\lambda^\circ)/T]^K = [(1 - L(\lambda^\circ))/a(\lambda^\circ)]^K$. Part 3 follows directly from the product form. $\square$

**Proof of Proposition 8.** The attention constraint $N(m + s\delta) \le T$ implies $m \le T/N - s\delta$. Substituting $m = 1 - \delta - \nu$ gives $1 - \delta - \nu \le T/N - s\delta$, which rearranges to (17). Setting $\nu = 0$ gives (18), and multiplying (18) by $N$ gives (19). Part 3 follows because the right-hand side of (17) is strictly increasing in $N$. $\square$

## Appendix B. Numerical Details

All illustrations assume $\ell \sim U[0, \bar\ell]$ with $\bar\ell = 2$, so that $F(\lambda) = \lambda/2$ and $L(\lambda) = \lambda^2/4$ on $[0, 2]$, with $V = T = 1$. Condition (7) becomes $(1 - s)(1 - 1) < 2s$, which holds for every $s > 0$.

*Table 1.* For each $(s, \phi, b)$, the threshold is the unique root of $h(\lambda) = (1-s)[1 - (1+\phi)\lambda^2/4] - bs - (1+\phi)\lambda[1 - (1-s)\lambda/2]$ on $[0, 2]$, computed by bisection. Each root was confirmed by direct numerical maximization of the subjective objective $U(\lambda)/a(\lambda)$. Reported surplus is $\Pi = (1 - \lambda^2/4)/a(\lambda)$, evaluated at true losses. For the surplus-maximizing owner, $g(\lambda) = (1 - s) - \lambda + (1 - s)\lambda^2/4$, so the threshold has the closed form $\lambda^u = 2\big[1 - \sqrt{1 - (1 - s)^2}\,\big]/(1 - s)$. This gives $\lambda^u = 1$ at $s = 0.2$ and $\lambda^u = 2/3$ at $s = 0.4$, consistent with equation (8): $0.8 \times 1.25 = 1$ and $0.6 \times 1.111 = 0.667$.

*Section 6.2 and Figure 1.* With $\sigma(K) = 0.15 + 0.75/(1 + K^4)$ and $\rho = 0.25$, $\Phi(K) = \big[1 - \sqrt{1 - (1-\sigma(K))^2}\,\big]/\big(1 - \sigma(K)\big)$. Steady states are the roots of $\Phi(K) - 0.25K$, located on a grid of 40,001 points on $[0, 4]$ and refined by bisection: $K \approx 0.203$, $0.987$, and $2.037$. Simulating the map $K_{t+1} = 0.75K_t + \Phi(K_t)$ for 200 periods from $K_0 \in \{0, 0.5, 0.98\}$ converges to $K \approx 0.203$, and from $K_0 \in \{1.0, 1.5, 3\}$ to $K \approx 2.037$. At the low steady state, $s \approx 0.899$, $\lambda \approx 0.102$, $\delta \approx 0.051$, $N \approx 1.005$, $\Pi \approx 1.003$. At the unstable steady state, $s \approx 0.535$ and $\delta \approx 0.247$. At the high steady state, $s \approx 0.191$, $\lambda \approx 1.019$, $\delta \approx 0.509$, $N \approx 1.701$, $\Pi \approx 1.259$.

*Section 7.* For $s = 0.2$, $\gamma(\lambda^\circ) = 1.25$ and, under $\phi = 0.5$ and $b = 0.2$ at every tier, $\lambda^\beta \approx 0.572$ and $\gamma(\lambda^\beta) \approx 1.1907$. The ratio is approximately 0.9525, so relative values at depths one through four are approximately 0.953, 0.907, 0.864, and 0.823. For the condition in Section 7.2 with $V = 1$, the left-hand side $(1 - L(\lambda))^K(\gamma(\lambda) - 1)$ equals 0.188, 0.141, and 0.105 at $K = 1, 2, 3$ under $\lambda^\circ = 1$, and 0.175, 0.161, and 0.148 under $\lambda^\beta$.

## References

- Aghion, P., and J. Tirole (1997). "Formal and Real Authority in Organizations." *Journal of Political Economy*, 105(1), 1–29.
- Akcigit, U., H. Alp, and M. Peters (2021). "Lack of Selection and Limits to Delegation: Firm Dynamics in Developing Countries." *American Economic Review*, 111(1), 231–275.
- Almeida, H., and D. Wolfenzon (2006). "A Theory of Pyramidal Ownership and Family Business Groups." *Journal of Finance*, 61(6), 2637–2680.
- Alonso, R., W. Dessein, and N. Matouschek (2008). "When Does Coordination Require Centralization?" *American Economic Review*, 98(1), 145–179.
- Anderson, S. J., and D. McKenzie (2022). "Improving Business Practices and the Boundary of the Entrepreneur: A Randomized Experiment Comparing Training, Consulting, Insourcing, and Outsourcing." *Journal of Political Economy*, 130(1), 157–209.
- Arrow, K. J. (1962). "The Economic Implications of Learning by Doing." *Review of Economic Studies*, 29(3), 155–173.
- Bandiera, O., R. Lemos, A. Prat, and R. Sadun (2018). "Managing the Family Firm: Evidence from CEOs at Work." *Review of Financial Studies*, 31(5), 1605–1653.
- Bandiera, O., A. Prat, S. Hansen, and R. Sadun (2020). "CEO Behavior and Firm Performance." *Journal of Political Economy*, 128(4), 1325–1369.
- Bartling, B., E. Fehr, and H. Herz (2014). "The Intrinsic Value of Decision Rights." *Econometrica*, 82(6), 2005–2039.
- Bennedsen, M., K. M. Nielsen, F. Pérez-González, and D. Wolfenzon (2007). "Inside the Family Firm: The Role of Families in Succession Decisions and Performance." *Quarterly Journal of Economics*, 122(2), 647–691.
- Bertrand, M., S. Johnson, K. Samphantharak, and A. Schoar (2008). "Mixing Family with Business: A Study of Thai Business Groups and the Families Behind Them." *Journal of Financial Economics*, 88(3), 466–498.
- Bertrand, M., and A. Schoar (2003). "Managing with Style: The Effect of Managers on Firm Policies." *Quarterly Journal of Economics*, 118(4), 1169–1208.
- Bloom, N., B. Eifert, A. Mahajan, D. McKenzie, and J. Roberts (2013). "Does Management Matter? Evidence from India." *Quarterly Journal of Economics*, 128(1), 1–51.
- Bloom, N., A. Mahajan, D. McKenzie, and J. Roberts (2020). "Do Management Interventions Last? Evidence from India." *American Economic Journal: Applied Economics*, 12(2), 198–219.
- Bloom, N., R. Sadun, and J. Van Reenen (2012). "The Organization of Firms Across Countries." *Quarterly Journal of Economics*, 127(4), 1663–1705.
- Bloom, N., and J. Van Reenen (2007). "Measuring and Explaining Management Practices Across Firms and Countries." *Quarterly Journal of Economics*, 122(4), 1351–1408.
- Bobadilla-Suarez, S., C. R. Sunstein, and T. Sharot (2017). "The Intrinsic Value of Choice: The Propensity to Under-Delegate in the Face of Potential Gains and Losses." *Journal of Risk and Uncertainty*, 54(3), 187–202.
- Bordalo, P., N. Gennaioli, and A. Shleifer (2012). "Salience Theory of Choice Under Risk." *Quarterly Journal of Economics*, 127(3), 1243–1285.
- Calvo, G. A., and S. Wellisz (1978). "Supervision, Loss of Control, and the Optimum Size of the Firm." *Journal of Political Economy*, 86(5), 943–952.
- Dessein, W. (2002). "Authority and Communication in Organizations." *Review of Economic Studies*, 69(4), 811–838.
- Dessein, W., A. Galeotti, and T. Santos (2016). "Rational Inattention and Organizational Focus." *American Economic Review*, 106(6), 1522–1536.
- Dessein, W., and T. Santos (2021). "Managerial Style and Attention." *American Economic Journal: Microeconomics*, 13(3), 372–403.
- Fehr, E., H. Herz, and T. Wilkening (2013). "The Lure of Authority: Motivation and Incentive Effects of Power." *American Economic Review*, 103(4), 1325–1359.
- Freundt, J., H. Herz, and L. Kopp (2026). "Choosing (Not) to Choose: Uncovering Intrinsic Preferences for Choice Autonomy." *Journal of Public Economics*, 259, 105681.
- Garicano, L. (2000). "Hierarchies and the Organization of Knowledge in Production." *Journal of Political Economy*, 108(5), 874–904.
- Garicano, L., and L. Rayo (2016). "Why Organizations Fail: Models and Cases." *Journal of Economic Literature*, 54(1), 137–192.
- Garicano, L., and E. Rossi-Hansberg (2006). "Organization and Inequality in a Knowledge Economy." *Quarterly Journal of Economics*, 121(4), 1383–1435.
- Garicano, L., and E. Rossi-Hansberg (2015). "Knowledge-Based Hierarchies: Using Organizations to Understand the Economy." *Annual Review of Economics*, 7, 1–30.
- Geanakoplos, J., and P. Milgrom (1991). "A Theory of Hierarchies Based on Limited Managerial Attention." *Journal of the Japanese and International Economies*, 5(3), 205–225.
- Grobovšek, J. (2020). "Managerial Delegation, Law Enforcement, and Aggregate Productivity." *Review of Economic Studies*, 87(5), 2256–2289.
- Gumpert, A., H. Steimer, and M. Antoni (2022). "Firm Organization with Multiple Establishments." *Quarterly Journal of Economics*, 137(2), 1091–1138.
- Halac, M., and A. Prat (2016). "Managerial Attention and Worker Performance." *American Economic Review*, 106(10), 3104–3132.
- Holmström, B. (1984). "On the Theory of Delegation." In M. Boyer and R. Kihlstrom (eds.), *Bayesian Models in Economic Theory*. Amsterdam: North-Holland, 115–141.
- Hsieh, C.-T., and P. J. Klenow (2014). "The Life Cycle of Plants in India and Mexico." *Quarterly Journal of Economics*, 129(3), 1035–1084.
- Jensen, M. C., and W. H. Meckling (1992). "Specific and General Knowledge, and Organizational Structure." In L. Werin and H. Wijkander (eds.), *Contract Economics*. Oxford: Blackwell, 251–274.
- Kala, N. (2024). "The Impacts of Managerial Autonomy on Firm Outcomes." *Econometrica*, 92(6), 1777–1800.
- Khanna, T., and Y. Yafeh (2007). "Business Groups in Emerging Markets: Paragons or Parasites?" *Journal of Economic Literature*, 45(2), 331–372.
- Kőszegi, B., and A. Szeidl (2013). "A Model of Focusing in Economic Choice." *Quarterly Journal of Economics*, 128(1), 53–104.
- Langer, E. J. (1975). "The Illusion of Control." *Journal of Personality and Social Psychology*, 32(2), 311–328.
- Lucas, R. E., Jr. (1978). "On the Size Distribution of Business Firms." *Bell Journal of Economics*, 9(2), 508–523.
- Malmendier, U., and G. Tate (2005). "CEO Overconfidence and Corporate Investment." *Journal of Finance*, 60(6), 2661–2700.
- Owens, D., Z. Grossman, and R. Fackler (2014). "The Control Premium: A Preference for Payoff Autonomy." *American Economic Journal: Microeconomics*, 6(4), 138–161.
- Penrose, E. T. (1959). *The Theory of the Growth of the Firm*. Oxford: Blackwell.
- Radner, R. (1993). "The Organization of Decentralized Information Processing." *Econometrica*, 61(5), 1109–1146.
- Rosen, S. (1982). "Authority, Control, and the Distribution of Earnings." *Bell Journal of Economics*, 13(2), 311–323.
- Williamson, O. E. (1967). "Hierarchical Control and Optimum Firm Size." *Journal of Political Economy*, 75(2), 123–138.

## Version History

| Version | Date | Changes |
|---|---|---|
| 1.0 | <time datetime="2026-10-17">17 October 2026</time> | First publication. |
| 1.1 | <time datetime="2026-10-18">18 October 2026</time> | Added a declaration on the use of generative AI. Corrected Proposition 3 (part 4), Proposition 5 and Proposition 6 and their proofs, the discussion of group depth in Section 7.2 and prediction P5, the description of Bloom et al. (2013) and Langer (1975), and a rounding error in Table 1. Added Figure 1, updated the literature review and references, and revised the exposition. |
