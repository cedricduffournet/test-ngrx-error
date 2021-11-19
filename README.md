# TestNgrxJest

This project is related to the folowwin issue https://github.com/ngrx/platform/issues/3243

## Reproduction

1. Clone this repo: github.com:cedricduffournet/test-ngrx-error.git
2. Install dependencies

```
yarn install
```

3. Run jest test

```
yarn jest
```

The following error occur in all tests with provideMockStore added to providers

```
 Cannot configure the test module when the test module has already been instantiated. Make sure you are not using `inject` before `R3TestBed.configureTestingModule`.
 beforeEach(() => {
  TestBed.configureTestingModule({
                ^
```

If i set `jest-jasmine2` as `testRunner` in jest config, I don't have any error.
I did not have this issue in version 12 of angular and ngrx

## additional information

if I disable `destroyAfterEach` in `configureTestingModule` all test pass https://github.com/cedricduffournet/test-ngrx-error/blob/master/src/app/books/containers/collection-page.component.spec.ts#L40 successfully

## solution ?

maybe we could use `shouldTearDownTestingModule` in https://github.com/ngrx/platform/blob/master/modules/store/testing/src/mock_store.ts#L21 and write something like this ?

```ts
if (typeof afterEach === "function") {
  afterEach(() => {
    try {
      const testBed = getTestBed() as any;
      const shouldTearDown = testBed.shouldTearDownTestingModule();
      if (!shouldTearDown) {
        const mockStore: MockStore | undefined = TestBed.inject(MockStore);
        if (mockStore) {
          mockStore.resetSelectors();
        }
      }
      // eslint-disable-next-line no-empty
    } catch {
      console.log("error");
    }
  });
}
```
