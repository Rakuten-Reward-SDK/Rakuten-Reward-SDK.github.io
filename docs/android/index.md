# Basic Setup

## Requirements

Before integrating the SDK, make sure your project meets the following minimum requirements.

| Requirement | Minimum |
|---|---|
| Android Studio | Arctic Fox or higher |
| Minimum SDK | API 24 — Android 7.0 |
| Compile SDK | API 36 |
| AndroidX | Required |

## Gradle Setup

### Step 1 — Add the Maven repository

In your **project-level** `build.gradle`, add the Rakuten Maven URL to the `allprojects` repositories block:

```groovy
allprojects {
    repositories {
        mavenCentral()
        maven {
            url "https://raw.githubusercontent.com/rakuten-ads/Rakuten-Reward-Native-Android/master/maven"
        }
    }
}
```

### Step 2 — Add dependencies

In your **app-level** `build.gradle`, import the Bill of Materials (BoM) to manage all SDK library versions from a single version number, then declare the modules without specifying individual versions.

```groovy
dependencies {
    // Import the BoM — controls all Reward SDK library versions
    implementation platform('com.rakuten.android:rewardsdknative-bom:8.2.0')

    // Core SDK (required)
    implementation 'com.rakuten.android:rewardsdknative-core'

    // Built-in UI — mission portal, notifications (optional)
    implementation 'com.rakuten.android:rewardsdknative-ui'
}
```

::: info ViewBinding & DataBinding
The `rewardsdknative-ui` module requires ViewBinding and DataBinding. If your app does not already enable them, add the following to your app-level `build.gradle`:

```groovy
buildFeatures {
    viewBinding true
    dataBinding true
}
```
:::
