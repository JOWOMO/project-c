
# BeeToBee Backend Api

## Setup

### Prerequisites

* [Python 3.7 64bit](https://realpython.com/installing-python/) 
* [Poetry](https://python-poetry.org/docs/) for Python depency management
* [npm](https://www.npmjs.com/get-npm) for serverless framework

### Preconfiguration

`poetry config virtualenvs.in-project true`

### Dev Environment

1. npm install
2. poetry install
3. cd pgsql, docker-compose up
4. npm run dev

## Deploy Environment

1. setup aws keys and add serverless to PATH

```
export AWS_ACCESS_KEY_ID=
export AWS_SECRET_ACCESS_KEY=
PATH=$(npm bin):$PATH
```
2. npm run deploy


## Guidelines
* shouldn't contain pylint errors
  * `poetry run pylint btb/ --disable=R,C,W`
* should be formatted with black
  * `poetry run black btb/`
* avoid relative imports
  * NO: `from ..foo import bar`
  * YES: `from btb.cool.foo import bar`
* have fun and read `poetry run python -c "import this"`
