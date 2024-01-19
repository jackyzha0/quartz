*Published on **2023-12-22**. Licensed under [CC BY-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0/).*

The **B**anner **A**lgebraic[^1] and **N**ormalised **Notation** (*BANNotation*) is a notation system that I devised for communicating banner designs in *Minecraft* (Mojang, 2011). This page will describe this system, and provide some examples of its use.

## Colours

The standard banner colours, and their notated forms, are defined in this table:

| Colour             | Notated | 
| ------------------ | ------- |
| **Wh**ite          | Wh      |
| **L**ight **G**ray | Lg      |
| **Gr**ay           | Gr      |
| **B**lac**k**      | Bk      |
| **Br**ow**n**      | Br      |
| **R**e**d**        | Rd      |
| **Or**ange         | Or      |
| **Ye**llow         | Ye      |
| **Li**me           | Li      |
| **G**ree**n**      | Gn      |
| **Cy**an           | Cy      |
| **L**ight **B**lue | Lb      |
| **Bl**ue           | Bl      |
| **Pu**rple         | Pu      |
| **Ma**genta        | Ma      |
| **Pi**nk           | Pi      |

*Colours sourced from [Minecraft Wiki](https://minecraft.wiki/w/Dye#Color_values)*.

## Patterns

The standard banner patterns (as displayed in-game on *Minecraft: Java Edition*[^2]), and their notated forms, are defined in this table, along with their expanded meanings.

| Pattern                         | Notated | Meaning                  |
| ------------------------------- | ------- | ------------------------ |
| Field                           | -       | (none)                   |
| Base                            | Sb      | stripe bottom            |
| Chief                           | St      | stripe top               |
| Pale Dexter                     | Sl      | stripe left              |
| Pale Sinister                   | Sr      | stripe right             |
| Pale                            | Scv     | stripe center vertical   |
| Fess                            | Sch     | stripe center horizontal |
| Bend                            | Sdw     | stripe downward          |
| Bend Sinister                   | Suw     | stripe upward            |
| Paly                            | Sbar    | stripe bars              |
| Saltire                         | Sx      | stripe x                 |
| Cross                           | Scr     | stripe cross             |
| Per Bend Sinister (JE)          | Wtl     | wedge top left           |
| Per Bend (JE)                   | Wtr     | wedge top right          |
| Per Bend Inverted (JE)          | Wbl     | wedge bottom left        |
| Per Bend Sinister Inverted (JE) | Wbr     | wedge bottom right       |
| Per Pale                        | Bl      | block left               |
| Per Pale Inverted               | Br      | block right              |
| Per Fess                        | Bt      | block top                |
| Per Fess Inverted               | Bb      | block bottom             |
| Base Dexter Canton              | Bbl     | block bottom left        |
| Base Sinister Canton            | Bbr     | block bottom right       |
| Chief Dexter Canton             | Btl     | block top left           |
| Chief Sinister Canton           | Btr     | block top right          |
| Chevron                         | Tb      | triangle bottom          |
| Inverted Chevron                | Tt      | triangle top             |
| Base Indented                   | Tmb     | triangle multiple bottom |
| Chief Indented                  | Tmt     | triangle multiple top    |
| Roundel                         | Cc      | centre circle            |
| Lozenge                         | Cd      | centre diamond           |
| Bordure                         | F       | frame                    |
| Bordure Indented                | Fw      | frame wavy               |
| Field Masoned                   | Cb      | centre bricks            |
| Gradient                        | Gt      | gradient top             |
| Base Gradient                   | Gb      | gradient bottom          |
| Creeper Charge                  | Cr      | centre creeper           |
| Skull Charge                    | Cs      | centre skull             |
| Flower Charge                   | Cf      | centre flower            |
| Thing                           | Cm      | centre mojang            |
| Globe                           | Cg      | centre globe             |
| Snout                           | Cp      | centre pig               | 

*Pattern names sourced from [Minecraft Wiki](https://minecraft.wiki/w/Banner/Patterns).*

## Syntax

A banner notation starts with a base, and then any number of patterns, in order of their application.

### Base

> For a more formal syntax definition, see [[BANNotation – Syntax in EBNF]].

A base banner is simply defined as **$B$.**, where $B$ is the base colour.

### Simple Patterns

A colour-pattern combination is defined as **$C$-$P$.**, where $C$ is a colour, and $P$ is a pattern. For example, a Blue Chevron would be **Bl-Tb** *(blue triangle bottom)*.

### Combined Gradient Base

For simple gradient bases, instead of notating a base $C_A$ and a gradient bottom $C_B$, you can use the shorthand **$C_A$+$C_B$-Gx.**, where **Gx** is the combined gradient pseudo-pattern, $C_A$ is the top colour, and $C_B$ is the bottom colour.

For example, a gradient that goes from blue at the top and red at the bottom would can be either:

- **Rd. Bl-Gt.**, or
- **Bl. Rd-Gb.**

But with the combined gradient syntax, it would be:

- **Bl+Rd-Gx.**

Note that this only works if the gradient is applied immediately after the base. If there are any patterns that are applied in between, the normal gradient top/bottom should be used instead.

## Examples

This example will define all of the banners on the stone brick wall in [this screenshot](https://i.imgur.com/FZJJFHV.png), posted by Jeb on Twitter/X.

Going left-to-right, then top-to-bottom:

1. **Bk. Lb-Cf.**
	- Black Base
	- Light Blue Flower Charge
2.  **Wh. Bk-Cc. Pi-Tb+Tt.**
	- White Base
	- Black Roundel
	- Pink Chevron
	- Pink Inverted Chevron
3. **Bl. Wh-Sx.**
	- Blue Base
	- White Saltire
4. **Bl. Wh-Cs.**
	- Black Base
	- White Skull Charge
5. **Bl. Lb-Cb. Ye-Wtl.**
	- Blue Base
	- Light Blue Field Masoned
	- Yellow Per Bend Sinister
6. **Gn+Li-Gx. Bk-Cr.**
	- *Green-Lime Gradient*
		- *either:*
			- Green Base
			- Lime Base Gradient 
		- *or*:
			- Lime Base
			- Green Gradient
	- Black Creeper Charge
7. **Wh. Rd-Sbar. Bk-Tmb+Tmt+Sch.**
	- White Base
	- Red Paly
	- Black Base Indented
	- Black Chief Indented
	- Black Fess
8. **Or. Ye-Btr+Bbl. Rd-Cc.**
	- Orange Base
	- Yellow Chief Sinister Canton
	- Yellow Base Dexter Canton
	- Red Roundel
9. **Bk.**
	- Black Base
10. **Rd.**
	- Red Base
11. **Lg.**
	- Light Gray Base
12. **Wh.**
	- White Base
13. **Li.**
	- Lime Base
14. **Or.**
	- Orange Base
15. **Cy.**
	- Cyan Base
16. **Pi.**
	- Pink Base

[^1]: "algebraic", as in [Algebraic Notation](https://en.wikipedia.org/wiki/Algebraic_notation_(chess)) in chess.
[^2]: This is a crucial point, as there are some naming conflicts between Bedrock and Java Edition, mainly in the Per Bends.