
## Getting Started

First, install dependencies:

```bash
pnpm install
```

Once the dependencies are installed, run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Libraries

### Vitest
For unit testing I've used vitest because it is what I usually use, it's really fast and easy to use. Also, the community is quite big.

### Zod
In this case, I've used Zod for validation because I have more experience altought but if the project requires to be optimised I would use Valibot which is much smaller and enough for this project.

### Tailwind CSS
I've used Tailwind CSS because it's the faster way to build something quickly. I don't really love Tailwind CSS because I don't like when the classNames are huge but I think it makes sense to use it in this case.

## Patterns
In this case I have all my components inside of  `/components` because it's a small project. If the component would be bigger, I would create a folder for each component to add the component file and the testing file. Also, I would split the fields component from the form and table and create a barrel file to import the components easily.
