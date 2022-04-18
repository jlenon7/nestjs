import '@secjs/env/src/utils/global'
import '@secjs/config/src/utils/global'
import '@secjs/logger/src/utils/global'

import { Sntl } from '@secjs/intl'

/*
|--------------------------------------------------------------------------
| Unit Kernel
|--------------------------------------------------------------------------
|
| Unit Kernel is responsible to load all global classes and functions, and
| load then when needed, like Config and Sntl classes.
|
*/

new Sntl().setDefaultLocale('en-us').loadSync()
