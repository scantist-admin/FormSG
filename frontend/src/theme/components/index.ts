import { RATING_THEME_KEY, RatingField } from './Field/Rating'
import { YESNO_THEME_KEY, YesNoField } from './Field/YesNo'
import { Badge } from './Badge'
import { Banner } from './Banner'
import { Button } from './Button'
import { Form } from './Form'
import { FormError } from './FormError'
import { FormLabel } from './FormLabel'
import { InlineMessage } from './InlineMessage'
import { Input } from './Input'
import { Link } from './Link'
import { NumberInput } from './NumberInput'
import { Pagination, PAGINATION_THEME_KEY } from './Pagination'
import { PhoneNumberInput } from './PhoneNumberInput'
import { Textarea } from './Textarea'
import { Tile } from './Tile'
import { Toast } from './Toast'

export const components = {
  Badge,
  Banner,
  Button,
  Form,
  FormError,
  FormLabel,
  Input,
  Link,
  InlineMessage,
  NumberInput,
  PhoneNumberInput,
  Textarea,
  [PAGINATION_THEME_KEY]: Pagination,
  [RATING_THEME_KEY]: RatingField,
  [YESNO_THEME_KEY]: YesNoField,
  Tile,
  Toast,
}