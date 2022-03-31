export const convertToArabic = function(s) {
	var finalInt = 0;
	var currentInt, nextInt = 0;
	var i = 0;
	while (i < s.length) {
		currentInt = getValue(s[i]);
		nextInt = getValue(s[i + 1]);
		if (currentInt < nextInt) {
			finalInt = finalInt + (nextInt - currentInt);
			i = i + 2;
		} else {
			finalInt = finalInt + currentInt;
			i++;
		}
	}
	return finalInt.toString();
};

const getValue = function(roman) {
	switch (roman) {
		case 'I':
			return 1;
		case 'V': 
			return 5;
		case 'X':
			return 10;
		case 'L':
			return 50;
		case 'C':
			return 100;
		case 'D':
			return 500;
		case 'M':
			return 1000;
		default:
			return 0;
	}
}

export const convertToRoman = (num) => {
	var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},
		roman = '',
		i;
	for ( i in lookup ) {
		while ( num >= lookup[i] ) {
			roman += i;
			num -= lookup[i];
		}
	}
	return roman;
}