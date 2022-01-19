# Svelte-template

Svelte-template using svelte-kit by [`coxwave`](https://github.com/coxwave)

## Creating a project

```bash
# create a new project in the current directory
git clone https://github.com/coxwave/svelte-template.git .

# create a new project in svelte-template
git clone https://github.com/coxwave/svelte-template.git svelte-template
```

## Connect to mongoDB

```bash
# make .env.local file
touch .env.local
```

Please connect your own [`mongoDB atlas`](https://www.mongodb.com/cloud/atlas/register?utm_content=rlsapostreg&utm_source=google&utm_campaign=gs_apac_rlsamulti_search_brand_dsa_atlas_desktop_rlsa_postreg&utm_term=&utm_medium=cpc_paid_search&utm_ad=&utm_ad_campaign_id=14412646494&adgroup=131761134692&gclid=Cj0KCQiA8vSOBhCkARIsAGdp6RSQqqo-v1YCJl8GD1atZuU6ejWr9xhZiENsRZJ_OIu1bBOyA7TYmnIaAkqiEALw_wcB) and fill envelopment varables in .env.local file (See sample.env.local)

## Developing

Once you've created a project and installed dependencies with `yarn install` (or `yarn`), start a development server:

```bash
yarn dev

# or start the server and open the app in a new browser tab
yarn dev -- --open
```

## Building

Before creating a production version of your app

```bash
yarn run build
```

> You can preview the built app after `yarn build` with `yarn preview`

## Eslint

Add `svelte` on eslint.validate field in vscode preferences settings.json file like code below

```
{
  ...,
  "eslint.validate": ["svelte"],
  ...,
}
```
