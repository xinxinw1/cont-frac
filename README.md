# Continued Fractions

Run it at http://musiclifephilosophy.com/codes/cont-frac/

This program makes it easy to study continued fractions.

## Usage

There are 4 sections: (frac | dec | func | cont)

Take note that if you switch sections, your data in the previous section will be lost!

### frac

This converts a normal fraction into a continued fraction. Input the numerator and denominator as two integers. (ex. 1578275893 / 2987598372947)

If you type a `/` in the first box, it automatically switches to the second box.

In all sections, `nprec` is the number of decimal places for the decimal number output.

### dec

This converts a decimal number into a continued fraction. Input a number like [`2.718281828459045235360287471353`](https://en.wikipedia.org/wiki/E_%28mathematical_constant%29#Representations)

### func

This uses two Javascript functions to generate the partial numerators and partial denominators of a [generalized continued fraction](https://en.wikipedia.org/wiki/Generalized_continued_fraction). In this program, `a(n)` are the numerators and `b(n)` are the denominators so that the final number is

```
a(0) + b(1) / (a(1) + b(2) / (a(2) + ...))
```

To run the program, click inside the nprec box, and press Enter or change the number.

For example, this gives [the golden ratio](https://en.wikipedia.org/wiki/Golden_ratio#Alternative_forms)

#### a(n)

```
return 1;
```

#### b(n)

```
return 1;
```

This gives [Euler's number e](https://en.wikipedia.org/wiki/E_%28mathematical_constant%29#Representations):

#### a(n)

```
if (n == 0)return 2;
if (n % 3 == 1)return 1;
if (n % 3 == 2)return ((n+1)/3)*2;
if (n % 3 == 0)return 1;
```

#### b(n)

```
return 1;
```

### cont

This converts a continued fraction into a regular fraction and a decimal number.

It takes continued fraction in a form like this:

```
[0; 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

Whitespace and square brackets are optional. Either `;` or `,` can be used as delimiters.

That means that this works just as well:

```
0,   1,2, 3 ,4 , 5, 6,7 ,8,9  ]
```

## License

This program is dedicated to the public domain using the [Creative Commons CC0](http://creativecommons.org/publicdomain/zero/1.0/). See `LICENSE.txt` for details.

