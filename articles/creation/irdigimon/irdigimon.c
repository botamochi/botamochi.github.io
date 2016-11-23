//--------------------------------------------------
//
// デジモン育成ギア 無線化モジュール ver0.9
// MCU: ATtiny13A
// CLOCK: 9.6MHz
// HFUSE: 0xFF
// LFUSE: 0x7A
//
// H.26 9/11
//
//--------------------------------------------------
#include <avr/io.h>
#include <avr/interrupt.h>
#include <util/delay.h>

// ----- 通信状態 -----
#define IDLE 0
#define RECV 1
#define XMIT 2

// ----- I/Oポート制御 -----
#define IR_LED_PIN PB0
#define IR_RCV_PIN PB1
#define DM_SIG_PIN PB2
#define GR_LED_PIN PB3
#define RE_LED_PIN PB4

#define INPUT_MODE(p)  DDRB &= ~(1<<(p))
#define OUTPUT_MODE(p) DDRB |= (1<<(p))

#define BIT_SET(p)  PORTB |= (1<<(p))
#define BIT_CLR(p)  PORTB &= ~(1<<(p))
#define BIT_READ(p) (PINB & (1<<(p)))

#define IR_LED_ON()  DDRB |= (1<<IR_LED_PIN)
#define IR_LED_OFF() DDRB &= ~(1<<IR_LED_PIN)

// ----- 割り込み処理 -----
#define IR_RCV_INT() ISR(INT0_vect)
#define DM_SIG_INT() ISR(PCINT0_vect)

#define IR_RCV_INT_ENABLE()  GIMSK |= (1<<INT0)
#define IR_RCV_INT_DISABLE() GIMSK &= ~(1<<INT0)
#define DM_SIG_INT_ENABLE()  GIMSK |= (1<<PCIE)
#define DM_SIG_INT_DISABLE() GIMSK &= ~(1<<PCIE)

#define IR_RCV_INT_FLG_CLR() GIFR |= (1<<INTF0)
#define DM_SIG_INT_FLG_CLR() GIFR |= (1<<PCIF)

static volatile struct _Context {
  int state;
  int count;
  int timeout;
} ctx;

/* ---------- main ---------- */
int main(void)
{
  ctx.state = IDLE;
  ctx.count = 0;
  ctx.timeout = 0;
  DDRB  = (1<<GR_LED_PIN) | (1<<RE_LED_PIN);
  PORTB = (1<<DM_SIG_PIN) | (1<<IR_RCV_PIN); // プルアップ
  MCUCR = (1<<ISC00); // 論理変化割り込み
  PCMSK = (1<<DM_SIG_PIN);
  GIMSK = (1<<INT0) | (1<<PCIE);
  TCCR0A = (1<<COM0A0) | (1<<WGM01) | (1<<WGM00);
  TCCR0B = (1<<WGM02) | (1<<CS00);
  OCR0A = 126; // 38kHz
  _delay_ms(500); // 受光モジュールが安定するまで待機
  sei();

  while (1) {
    _delay_us(1000);
    if (ctx.state == IDLE) {
      ctx.timeout = 200;
    } else {
      ctx.timeout--;
    }
    if (ctx.timeout == 0) {
      cli();
      ctx.state = IDLE;
      ctx.count = 0;
      BIT_CLR(GR_LED_PIN);
      BIT_CLR(RE_LED_PIN);
      BIT_SET(DM_SIG_PIN);
      INPUT_MODE(DM_SIG_PIN);
      IR_LED_OFF();
      IR_RCV_INT_FLG_CLR();
      DM_SIG_INT_FLG_CLR();
      IR_RCV_INT_ENABLE();
      DM_SIG_INT_ENABLE();
      sei();
    }
  }
  return 0;
}

/* ---------- 受光モジュールからの信号 ---------- */
IR_RCV_INT()
{
  if (ctx.state == IDLE) {
    DM_SIG_INT_DISABLE();
    OUTPUT_MODE(DM_SIG_PIN);
    BIT_SET(RE_LED_PIN);
    ctx.state = RECV;
  }
  if (BIT_READ(IR_RCV_PIN) != 0) {
    BIT_SET(DM_SIG_PIN);
  } else {
    BIT_CLR(DM_SIG_PIN);
  }
  ctx.count++;
  if (ctx.count >= 36) {
    ctx.count = 0;
    BIT_SET(DM_SIG_PIN);
    INPUT_MODE(DM_SIG_PIN);
    BIT_CLR(RE_LED_PIN);
    ctx.state = IDLE;
    _delay_us(500);
    DM_SIG_INT_FLG_CLR();
    DM_SIG_INT_ENABLE();
  }
}

/* ---------- 育成ギアからの信号 ---------- */
DM_SIG_INT()
{
  if (ctx.state == IDLE) {
    IR_RCV_INT_DISABLE();
    BIT_SET(GR_LED_PIN);
    ctx.state = XMIT;
  }
  if (BIT_READ(DM_SIG_PIN) != 0) {
    IR_LED_OFF();
  } else {
    IR_LED_ON();
  }
  ctx.count++;
  if (ctx.count >= 36) {
    ctx.count = 0;
    IR_LED_OFF();
    BIT_CLR(GR_LED_PIN);
    ctx.state = IDLE;
    _delay_us(500);
    IR_RCV_INT_FLG_CLR();
    IR_RCV_INT_ENABLE();
  }
}
