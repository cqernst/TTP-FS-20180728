# Tech Talent Pipeline Full Stack Assessment
Node/Express/Postgres application for making stock purchases. 

To start up the project, clone this repo to your machine and 

- `npm install` 
- Create a postgres database called stockapp. You can change the name if you prefer so long as you change the corresponding reference to the database in server/db/db.js
- `npm run start-dev`
- navigate to localhost:3000

![brewing](https://media.giphy.com/media/aBtCn9gW091Ju/giphy.gif)

### Current functionality:
- [x] a user can create a new account with name, email, and  password
- [x] a user’s cash  account balance is defaulted set to $5000.00  USD
- [x] a user can only register once with any given email
- [x] logged in user automatatically transferred to home dashboard
- [x] user authenticates via  email and password in order to access account
- [ ] user can buy  shares of stock at its current price by specifying its sticker symbol and number of shares
- [x] a user can  only buy whole number quantities  of  shares
- [ ] a user can only buy shares if they have enough cash in their account for a given purchase
- [ ] a user can only buy shares if the ticker symbol is valid
- [ ] a user can view a list of their transactions
- [ ] a user can see a list of their stocks along with their current values
- [ ] user's portfolio values should be based on the latest price and quantity owned for a given stock
- [ ] a user should see the font color of stock symbols and current prices change dynamically 
- [ ] display red when the current price is less than the day's open price
- [ ] display green when the current price is greatr than the day's open price
- [ ] display grey when the current price is the same as the day's open price

### Concerns/research goals:
- [ ] testing
- [ ] protection for backend routes
- [ ] accessibility/visibility to screen readers
- [ ] Do we anticipate users wanting to access this on mobile? 
- [ ] mobile styling
- [ ] mobile security 
- [ ] what do we do about latency (for example, on the subway?)
- [ ] will this work over slow connections/ what will a user see without javascript enabled?
