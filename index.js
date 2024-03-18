const readme = require('./readme');
const  fs = require('fs');

const moodDay = {
	1: 'hate',
	2: 'malice',
	3: 'envy',
	4: 'happiness',
	5: 'geek mood',
	6: 'horror',
	7: 'love',
};

const socialLink = [
	{ label: 'LinkedIn', url: 'https://linkedin.com/in/ibrahimadansoko', color: '-%230077B5' },
	{ label: 'Twitter', url: 'https://twitter.com/ibrahimdans', color: '-%231DA1F2' },
	{ label: 'Discord', url: 'htttps://discord.gg/ibrahimdans', color: '-%237289DA' },
	{ label: 'Twitch', url: 'https://www.twitch.tv/ibrahimdans', color: '-%239146FF' },
	{ label: 'Stack-overflow', url: 'https://stackoverflow.com/users/12078007', color: '-%FE7A16' },
];



const getName = () => `Ibrahima DANSOKO`;

const firstCreateReadme = () => `2020-10-06`;

const today = new Date();

const addAuthor = () => `This README.md is updated with ${ moodDay[today.getDay()+1] }, by ibrahimdans ❤️`;

const getTodayDate = () => today.toDateString();



const replacer = (arg) => arg.toString().replaceAll(',', '');
const getSocialLinks = () => socialLink.map(socialInfo => `[![${socialInfo.label}](https://img.shields.io/badge/${socialInfo.label.replace('-','')}${socialInfo.color}.svg?logo=${socialInfo.label}&logoColor=white)](${socialInfo.url})\n`).toString().replaceAll(',','&nbsp;');
const getHobbiesList = () => replacer(hobbies.map(({ logo, label }) => `* ${ logo } ${ label } \n`))
const findIdentifierIndex = (rows, identifier) => rows.findIndex((r) => Boolean(r.match(new RegExp(`<#${identifier}>`, 'i'))));

const updateREADMEFile = (text) => fs.writeFileSync('./README.md', text, () => console.log(text));

const generateNewREADME = () => {
	const readmeRow = readme.split('\n');
	
	function updateIdentifier(identifier, replaceText) {
		const identifierIndex = findIdentifierIndex(readmeRow, identifier);
		if (!readmeRow[identifierIndex]) return;
		readmeRow[identifierIndex] = readmeRow[identifierIndex].replace(
			`<#${ identifier }>`,
			replaceText,
		);
	}
	
	const identifierToUpdate = {
		name: getName(),
		firstCreateReadme: firstCreateReadme(),
		today_date: getTodayDate(),
		socialLinks: getSocialLinks(),
		addAuthor: addAuthor(),
	};
	
	Object.entries(identifierToUpdate).forEach(([key, value]) => {
		updateIdentifier(key, value);
	});
	
	return readmeRow.join('\n');
};

function main() {
	const newREADME = generateNewREADME();
	console.log(newREADME, '<=== readme Generated');
	return updateREADMEFile(newREADME);
}

main();
