
# GO2PLAY

A football booking venue website

## Description

Frontend Side build by ReactJS

![image](https://github.com/user-attachments/assets/7fe79215-6464-4d0d-8112-2d54ff398919)


## Presequite

#### Yarn

```
$ npm install -g yarn
```

## Installation

```bash
$ yarn install
```

## Environment variables

#### Create .env file:

```
$ nano .env
```

#### .env

```
VITE_API_URL=

VITE_PROVINCE_API_URL=

VITE_GOOGLE_MAPS_API_KEY=

VITE_STRIPE_PUBLIC_KEY=

SENTRY_DNS=
```

Note: Please ask another dev to get access to the env vars in these files.

## Running the app

```bash
# development
$ yarn dev
```
## File Structure
```bash
├── index.html
├── package.json
├── public
│   ├── banner.jpg
│   ├── icon_knockout.svg
│   ├── icon_round_robin.svg
│   ├── logo.png
│   └── logo.svg
├── README.md
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── assets
│   │   └── images
│   │       ├── common
│   │       │   ├── index.ts
│   │       │   └── no-result.png
│   │       ├── language
│   │       │   ├── en.png
│   │       │   ├── index.ts
│   │       │   └── vi.png
│   │       └── payment
│   │           ├── index.ts
│   │           └── stripe.jpg
│   ├── common
│   │   ├── constants
│   │   │   └── index.ts
│   │   ├── datas
│   │   │   ├── location.data.ts
│   │   │   └── pitch-category.data.ts
│   │   ├── dtos
│   │   │   └── base.dto.ts
│   │   └── enums
│   │       ├── filter-chart.enum.ts
│   │       ├── location.enum.ts
│   │       ├── order.enum.ts
│   │       └── pitch-category.enum.ts
│   ├── components
│   │   ├── AddNewPitchBox.tsx
│   │   ├── ConfirmBox.tsx
│   │   ├── Copyright.tsx
│   │   ├── CustomTabPanel.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── ImageLibrary.tsx
│   │   ├── ImageUpload.tsx
│   │   ├── index.ts
│   │   ├── Layout.tsx
│   │   ├── Link.tsx
│   │   ├── LocationPicker.tsx
│   │   ├── MapPlace.tsx
│   │   ├── MatchDetail.tsx
│   │   ├── MenuActions.tsx
│   │   ├── MenuNotification.tsx
│   │   ├── NotificationContainer.tsx
│   │   ├── PaymentForm.tsx
│   │   ├── PriceFilter.tsx
│   │   ├── RatingBox.tsx
│   │   ├── SearchBox.tsx
│   │   ├── SearchFilter.tsx
│   │   ├── SearchResultCard.tsx
│   │   ├── SearchSort.tsx
│   │   ├── SelectBox.tsx
│   │   ├── SetScheduleBox.tsx
│   │   ├── SetTimeSchedule.tsx
│   │   ├── Slider.tsx
│   │   ├── StatusBox.tsx
│   │   ├── Stepper.tsx
│   │   ├── StripeContainer.tsx
│   │   ├── TextArea.tsx
│   │   ├── TimeSelection.tsx
│   │   ├── TimeSelect.tsx
│   │   ├── TournamentLayout.tsx
│   │   ├── UpdatePitchBox.tsx
│   │   ├── UpdateScore.tsx
│   │   ├── UploadImage.tsx
│   │   ├── UserAccountLayout.tsx
│   │   ├── VenueManagement
│   │   │   ├── ImagesManagement.tsx
│   │   │   ├── InfoManagement.tsx
│   │   │   ├── LocationManagement.tsx
│   │   │   └── pitchesManagement.tsx
│   │   └── VenueManagementLayout.tsx
│   ├── hooks
│   │   ├── index.ts
│   │   ├── useAuth.ts
│   │   ├── useBoolean.ts
│   │   ├── useDebounce.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useMenu.ts
│   │   ├── usePaymentForm.ts
│   │   ├── usePitchMutation.ts
│   │   ├── useSocket.ts
│   │   ├── useVenueByUser.ts
│   │   └── useVenueMutation.ts
│   ├── index.css
│   ├── locales
│   │   ├── en-US
│   │   │   ├── account
│   │   │   │   └── index.ts
│   │   │   ├── booking
│   │   │   │   └── index.ts
│   │   │   ├── home
│   │   │   │   └── index.ts
│   │   │   ├── index.ts
│   │   │   ├── search
│   │   │   │   └── index.ts
│   │   │   ├── tournament
│   │   │   │   └── index.ts
│   │   │   └── venue-detail
│   │   │       └── index.ts
│   │   ├── index.tsx
│   │   └── vi
│   │       ├── account
│   │       │   └── index.ts
│   │       ├── booking
│   │       │   └── index.ts
│   │       ├── home
│   │       │   └── index.ts
│   │       ├── index.ts
│   │       ├── search
│   │       │   └── index.ts
│   │       ├── tournament
│   │       │   └── index.ts
│   │       └── venue-detail
│   │           └── index.ts
│   ├── main.tsx
│   ├── pages
│   │   ├── AccountBooking.tsx
│   │   ├── AccountNotification.tsx
│   │   ├── AccountPassword.tsx
│   │   ├── AccountProfile.tsx
│   │   ├── AccountTournament.tsx
│   │   ├── BookingComplete.tsx
│   │   ├── Booking.tsx
│   │   ├── CreateTournament.tsx
│   │   ├── ForgottenPassword.tsx
│   │   ├── Home.tsx
│   │   ├── index.ts
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── ResetPassword.tsx
│   │   ├── Search.tsx
│   │   ├── TournamentMatch.tsx
│   │   ├── TournamentSchedule.tsx
│   │   ├── TournamentStanding.tsx
│   │   ├── TournamentTeamManagement.tsx
│   │   ├── VenueDetail.tsx
│   │   └── venueManagement
│   │       ├── BookingManagement.tsx
│   │       ├── Dashboard.tsx
│   │       └── VenueManagement.tsx
│   ├── services
│   │   ├── auth
│   │   │   ├── auth.dto.ts
│   │   │   └── auth.service.ts
│   │   ├── booking
│   │   │   ├── booking.dto.ts
│   │   │   ├── booking.query.ts
│   │   │   └── booking.service.ts
│   │   ├── location
│   │   │   ├── location.dto.ts
│   │   │   ├── location.query.ts
│   │   │   └── location.service.ts
│   │   ├── match
│   │   │   ├── match.dto.ts
│   │   │   ├── match.query.ts
│   │   │   └── match.service.ts
│   │   ├── media
│   │   │   ├── media.dto.ts
│   │   │   └── media.service.ts
│   │   ├── notification
│   │   │   ├── notification.dto.ts
│   │   │   ├── notification.query.ts
│   │   │   └── notification.service.ts
│   │   ├── pitch
│   │   │   ├── pitch.dto.ts
│   │   │   ├── pitch.query.ts
│   │   │   └── pitch.service.ts
│   │   ├── pitch_category
│   │   │   ├── pitch-category.dto.ts
│   │   │   ├── pitch-category.query.ts
│   │   │   └── pitch-category.service.ts
│   │   ├── rating
│   │   │   ├── rating.dto.ts
│   │   │   ├── rating.query.ts
│   │   │   └── rating.service.ts
│   │   ├── round
│   │   │   ├── round.dto.ts
│   │   │   ├── round.query.ts
│   │   │   └── round.service.ts
│   │   ├── stripe
│   │   │   ├── stripe.dto.ts
│   │   │   ├── stripe.query.ts
│   │   │   └── stripe.service.ts
│   │   ├── team
│   │   │   ├── team.dto.ts
│   │   │   ├── team.query.ts
│   │   │   └── team.service.ts
│   │   ├── tournament
│   │   │   ├── tournament.dto.ts
│   │   │   ├── tournament.query.ts
│   │   │   └── tournament.service.ts
│   │   ├── user
│   │   │   ├── user.dto.ts
│   │   │   ├── user.query.ts
│   │   │   └── user.service.ts
│   │   └── venue
│   │       ├── venue.dto.ts
│   │       ├── venue.query.ts
│   │       └── venue.service.ts
│   ├── styles
│   │   └── theme.ts
│   ├── utils
│   │   ├── acronym.ts
│   │   ├── axiosConfig.ts
│   │   ├── convertCurrency.ts
│   │   ├── convertDecimalToTime.ts
│   │   ├── convertRoundName.ts
│   │   ├── convertToAMPM.ts
│   │   ├── convertToDate.ts
│   │   ├── createTournament.ts
│   │   ├── dateToTimeFloat.ts
│   │   ├── defineQuery.ts
│   │   ├── findBookingFreeTime.ts
│   │   ├── formatDate.ts
│   │   ├── getMonthsAgo.ts
│   │   ├── groupBy.ts
│   │   └── index.ts
│   └── vite-env.d.ts
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json
├── vite.config.ts
└── yarn.lock
```
## Architecture Diagram
![architecture-diagram](https://github.com/alex-go-nguyen/booking-field-fe/assets/133078261/1258fa2b-4e00-4e05-af1a-0fccf7cd758e)

## Database Diagram
![mermaid-diagram-2023-09-20-151717](https://github.com/alex-go-nguyen/booking-field-be/assets/133078261/fcb47320-6afa-4efe-ae9b-7815ec8c9898)
