#### python scraping
Scraping [TDCJ death roll website](https://www.tdcj.texas.gov/death_row/dr_executed_offenders.html) may not be the most difficult.
However, the tricky part is that over 90 percent of the content inside the information-links (cell "Offender Information") are replaced with images instead of texts; this "error" will leave the "Info" key in last-words.json incomplete, and would need to personally hard code those.
The statement-links (cell "Last Statement") is tricky too. The statement-pages are structured with many paragraphs, and it was only later that I discovered with some statements were broken into different paragraphs instead of line breaks. The "errors" would need to be hard coded as well. There are some weird encrypts within many paragraphs as well, which have been fixed for this project.

These are the problems one would encounter if run scrape_death.py in this folder.

In all, I was completely new to python, but it was a nice learning experience, and it was fun seeing the scraping process on terminal with about 1700 web pages.
