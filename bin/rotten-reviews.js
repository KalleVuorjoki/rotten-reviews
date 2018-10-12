#!/usr/bin/env node

const Commander = require('commander')
const Json2CsvParser = require('json2csv').Parser
const RottenReviews = require('..')

const Csv = new Json2CsvParser({
  fields: ['reviewer', 'date', 'stars', 'review'],
})

Commander.description('scrapes audience movie reviews from rotten tomatoes')
  .option('--csv', 'exports to csv (defaults to json)')
  .arguments('<showtype> <title> <pages>')
  .action((showtype, title, pages) => {
    RottenReviews.getAudienceReviews(showtype, title, pages).then(reviews => {
      console.log(
        Commander.csv ? Csv.parse(reviews) : JSON.stringify(reviews, null, 2)
      )
    })
  })
  .parse(process.argv)

if (!(Commander.args.length > 0)) Commander.help()
