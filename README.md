# Skint Dance

## Prerequisites

1. Install Hugo from http://gohugo.io

## To edit

1. Run `hugo server`
2. Visit http://localhost:1313

## To deploy

1. Run `hugo build`
2. Run `aws s3 sync build/ s3://www.skintdance.org.uk/`
3. Preview at http://www.skintdance.org.uk.s3-website-eu-west-1.amazonaws.com/
4. Cloudfront will take a while for the cache to catch up.

