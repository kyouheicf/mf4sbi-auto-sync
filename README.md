# README.md

Do `git clone` this repo first.

Set your credentials for login.

```
npx wrangler secret put USERNAME
npx wrangler secret put PASSWORD
```

Then you can deploy

```
npx wrangler deploy
```

Cron trigger is based on the following schedule. You can edit it as needed, thanks.
(Every day at 00:00:00 am UTC)

```
"0 0 * * *"
```