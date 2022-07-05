module.exports = {
    progressbar: function (value, maxValue, size) {
        const percentage = value / maxValue; 
        const progress = Math.round(size * percentage); 
        const emptyProgress = size - progress; 
      
        const progressText = "<:redline:977503519546417202>".repeat(progress); 
        const emptyProgressText = "<:greyline:977503632280944670>".repeat(emptyProgress); 
        const percentageText = (Math.round(percentage * 100).toFixed(0))+"%"; 
      
        const Bar = `\`[\` ${progressText}${emptyProgressText} \`]\``; 
        return { Bar, percentageText };
    } 
}