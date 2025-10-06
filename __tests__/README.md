# Tests

## Test Structure

### Test Files

- **`index.ts`**: Fixture-based tests for plugin transformation
  - Tests each note type (note, tip, important, quote, bonus)
  - Compares actual output against known-good expected output
  - Uses `rehype-parse` to parse HTML into HAST for structural comparison
  - Strips position data for stable comparisons

- **`styles.ts`**: Tests for automatic style injection
  - Verifies styles are automatically injected
  - Ensures styles are injected only once per document
  - Validates CSS content is not empty

- **`generate-fixtures.ts`**: Utility script to regenerate expected outputs
  - Run when you make intentional changes to plugin output. MUST be done with caution.
  - Updates all fixture outputs to match current implementation

### Fixtures Directory (`__fixtures__/`)

Each note type has its own directory containing:

- `input.md`: Sample markdown input for that note type
- `output.html`: Expected HTML output (auto-generated)

Structure:

```
__fixtures__/
├── note/
│   ├── input.md
│   └── output.html
├── tip/
│   ├── input.md
│   └── output.html
├── important/
│   ├── input.md
│   └── output.html
├── quote/
│   ├── input.md
│   └── output.html
└── bonus/
    ├── input.md
    └── output.html
```

## Running Tests

```bash
# Run all tests
yarn test

# Run fixture tests only
yarn test:fixtures

# Run style injection tests only
yarn test:styles

# Regenerate expected outputs after changes
yarn generate:fixtures
```

## Testing Approach

1. **Fixture-based testing**: Instead of inline test data, we use separate files for inputs and expected outputs
2. **Structural comparison**: Uses `rehype-parse` to parse HTML into HAST (Hypertext Abstract Syntax Tree) for comparison
3. **Position-agnostic**: Strips position data from HAST to avoid tests that break on whitespace changes
4. **Separation of concerns**: Plugin transformation tests are separate from style injection tests

## Adding New Test Cases

To add a new test case:

1. Create a new directory in `__fixtures__/` (e.g., `__fixtures__/new-type/`)
2. Add `input.md` with your test markdown
3. Run `yarn generate:fixtures` to auto-generate the expected `output.html`
4. Add the new type to the `FIXTURE_TYPES` array in `index.ts`
