# Migration Guide

::: info Coming soon
Migration guide for upgrading between SDK versions.
:::

#### For RID, RAE login options
* Remove the following `init` method if you are using it
```kotlin
RakutenReward.init("<AppCode>", "<Token>")
```