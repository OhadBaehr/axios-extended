<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://svgshare.com/i/qvk.svg" alt="Project logo"></a>
</p>

<h3 align="center">axios-extended</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/OhadBaehr/axios-extended.svg)](https://github.com/OhadBaehr/axios-extended/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/OhadBaehr/axios-extended.svg)](https://github.com/OhadBaehr/axios-extended/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Typesafe extension to axios
    <br> 
</p>

## 📝 Table of Contents

- [❓ About ](#-about-)
- [⬇️ Getting Started ](#️-getting-started-)
  - [Installing](#installing)
- [✨ Usage ](#-usage-)
- [🔥 With Next.js ](#-with-nextjs-)
- [✅ Advantages ](#-advantages-)
  - [Want to help make this library even better?](#want-to-help-make-this-library-even-better)

\
&nbsp;
# ❓ About <a name = "about"></a>

Next Axios makes it easy to create typesafe fullstack applications
\
&nbsp;

# ⬇️ Getting Started <a name = "getting_started"></a>


## Installing


```
npm i axios axios-extended
```

or

```
yarn add axios axios-extended
```

\
&nbsp;
# ✨ Usage <a name="usage"></a>

Add notes about how to use the system.
```typescript
import AxiosExtended from 'axios-extended'

export type FeedAPI = {
    URL: "/api/feed"
    POST: {
        body: {
            limit:number
        }
        response: {
            message: string
        }
    }
    GET: {
        params: {
            limit: number
        },
        response: {
            message: string
        }
    }
}

export const APIClient = AxiosExtended<[FeedAPI]>()


// APIClient.post() // start typing and see the magic happen
// APIClient.get() // start typing and see the magic happen
```
[![example1](https://i.ibb.co/9rFQqBR/stage1.jpg)]()
[![example2](https://i.ibb.co/hMWs9Sr/stage2.jpg)]()
[![example3](https://i.ibb.co/KGGysP5/stage3.jpg)]()
[![example3](https://i.ibb.co/7vmFbmJ/stage4.jpg)]()


\
&nbsp;
# 🔥 With Next.js <a name="usage-with-nextjs"></a>

```typescript
// somefile.ts
export const API = createAPI<NextApiRequest,NextApiResponse>() 
```



```typescript
// pages/api/feed
import {API} from '<route-to-somefile>'

export type FeedAPI = {
    URL: "/api/feed"
    POST: {
        body: {
            feedType:string,
            page:number
            subject:string
        }
        response: {
            message: string
        }
    }
    GET: {
        params: {
            limit: number
        },
        response: {
            message: string
        }
    }
}

export default API<FeedAPI>(async (req, res) => {
    try {
        if (req.method === "POST") {
            // body is fully typed!
            const { feedType, page, subject } = req.body
            res.status(200).json({message: feedType})
        }
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: "Server Error" })
    }
})
```

```typescript
// some-other-file.ts

//import *type* is very important!
import type FeedAPI from '<route-to-api/feed>'

// now use APIClient anywhere, if you need to add more endpoints just add them to the array!
export const APIClient = NextAxios<[
    FeedAPI,
    //... add more!
]>()
```

\
&nbsp;
# ✅ Advantages <a name="advantages"></a>
NextAxios makes it easier to maintain fullstack applications, specifically tailored for usage with Next.js but is cross platform.

* No more import types everywhere we fetch
* One source of truth
* Faster maintenance



\
&nbsp;
## Want to help make this library even better?
Join the conversation on [Github](https://github.com/OhadBaehr/axios-extended/pulls)!
