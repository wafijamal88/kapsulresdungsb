/**
 * KAPSUL RESDUNG SB - WHATSAPP ORDERING & INTERACTION SCRIPT
 * High Performance Vanilla JS
 */

// Global handler untuk pertukaran video showcase
window.switchSuitableVideo = function(btn) {
  if (!btn) return;
  const newSrc = btn.getAttribute('data-src');
  const mainVideo = document.getElementById('main-suitable-video');
  if (!mainVideo || !newSrc) return;

  // Kemas kini butang aktif
  document.querySelectorAll('.video-tab-btn').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-selected', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-selected', 'true');

  // Kemas kini sumber video
  const sourceTag = mainVideo.querySelector('source');
  if (sourceTag) {
    sourceTag.src = newSrc;
  }
  mainVideo.src = newSrc;
  mainVideo.load();
  mainVideo.play().catch(() => {
    // Autoplay fallback
  });
};

document.addEventListener('DOMContentLoaded', () => {
  // KONFIGURASI RASMI
  const CONFIG = {
    whatsappNumber: '60134738701',
    whatsappDisplay: '013-473 8701',
    brandName: 'Kapsul Resdung SB'
  };

  // 1. STICKY HEADER & BACK TO TOP
  const header = document.querySelector('.site-header');
  const backToTopBtn = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    if (scrollPos > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }

    if (scrollPos > 350) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 2. MOBILE DRAWER NAVIGATION (RESPONSIF UNTUK SEMUA VERSI)
  const mobileToggle = document.getElementById('mobile-nav-toggle') || document.querySelector('.mobile-nav-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer') || document.querySelector('.mobile-drawer');
  const drawerOverlay = document.getElementById('drawer-overlay') || document.querySelector('.drawer-overlay');
  const drawerClose = document.getElementById('drawer-close') || document.querySelector('.drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.add('open');
      mobileDrawer.setAttribute('aria-hidden', 'false');
    }
    if (drawerOverlay) {
      drawerOverlay.classList.add('open');
      drawerOverlay.setAttribute('aria-hidden', 'false');
    }
    if (mobileToggle) {
      mobileToggle.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      mobileDrawer.setAttribute('aria-hidden', 'true');
    }
    if (drawerOverlay) {
      drawerOverlay.classList.remove('open');
      drawerOverlay.setAttribute('aria-hidden', 'true');
    }
    if (mobileToggle) {
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileDrawer && mobileDrawer.classList.contains('open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Close drawer on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // 3. PAKEJ SEBENAR DARIPADA HALAMAN RUJUKAN
  // Nama pakej tepat seperti di sumber rujukan:
  // - Pakej 1 BOTOL RM70
  // - Pakej 3 BOTOL RM130
  // - Pakej 4 BOTOL RM 160
  // - pakej 6 BOTOL RM 220
  const packagesMap = {
    'pkg1': 'Pakej 1 BOTOL RM70',
    'pkg3': 'Pakej 3 BOTOL RM130',
    'pkg4': 'Pakej 4 BOTOL RM 160',
    'pkg6': 'pakej 6 BOTOL RM 220'
  };

  const packagePrices = {
    'Pakej 1 BOTOL RM70': 70,
    'Pakej 3 BOTOL RM130': 130,
    'Pakej 4 BOTOL RM 160': 160,
    'pakej 6 BOTOL RM 220': 220
  };

  const packageSelectInput = document.getElementById('cust-package');
  const quantityInput = document.getElementById('cust-quantity');
  const qtyMinusBtn = document.getElementById('qty-minus');
  const qtyPlusBtn = document.getElementById('qty-plus');
  const summaryPackageName = document.getElementById('summary-pkg-name');
  const summaryQuantity = document.getElementById('summary-quantity');
  const summaryTotalAmount = document.getElementById('summary-total-amount');

  function updateOrderSummary() {
    const selectedPkg = packageSelectInput ? packageSelectInput.value : 'Pakej 3 BOTOL RM130';
    let qty = parseInt(quantityInput ? quantityInput.value : 1, 10);
    if (isNaN(qty) || qty < 1) qty = 1;

    const unitPrice = packagePrices[selectedPkg] || 130;
    const total = unitPrice * qty;

    if (summaryPackageName) summaryPackageName.textContent = selectedPkg;
    if (summaryQuantity) summaryQuantity.textContent = `${qty} unit / set`;
    if (summaryTotalAmount) summaryTotalAmount.textContent = `RM${total}`;
  }

  if (packageSelectInput) {
    packageSelectInput.addEventListener('change', updateOrderSummary);
  }

  // Quantity Stepper Controls (+ / -)
  if (qtyMinusBtn && quantityInput) {
    qtyMinusBtn.addEventListener('click', () => {
      let current = parseInt(quantityInput.value, 10) || 1;
      if (current > 1) {
        quantityInput.value = current - 1;
        updateOrderSummary();
      }
    });
  }

  if (qtyPlusBtn && quantityInput) {
    qtyPlusBtn.addEventListener('click', () => {
      let current = parseInt(quantityInput.value, 10) || 1;
      quantityInput.value = current + 1;
      updateOrderSummary();
    });
  }

  if (quantityInput) {
    quantityInput.addEventListener('input', () => {
      let current = parseInt(quantityInput.value, 10);
      if (isNaN(current) || current < 1) {
        quantityInput.value = 1;
      }
      updateOrderSummary();
    });
  }

  // Handle "Pilih Pakej" button clicks on Pricing Cards
  const pricingSelectButtons = document.querySelectorAll('[data-select-pkg]');
  pricingSelectButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const pkgKey = btn.getAttribute('data-select-pkg');
      const exactPackageName = packagesMap[pkgKey] || 'Pakej 3 BOTOL RM130';

      if (packageSelectInput) {
        packageSelectInput.value = exactPackageName;
        updateOrderSummary();
      }

      const orderSection = document.getElementById('tempah');
      if (orderSection) {
        orderSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 4. TOAST NOTIFIKASI WHATSAPP
  const waToast = document.getElementById('wa-toast');
  function showToast(message) {
    if (!waToast) return;
    const toastText = waToast.querySelector('.wa-toast-text');
    if (toastText) toastText.textContent = message;
    waToast.classList.add('show');
    setTimeout(() => {
      waToast.classList.remove('show');
    }, 4500);
  }

  // 5. BORANG TEMPAHAN KE WHATSAPP (013-473 8701)
  const orderForm = document.getElementById('order-form');

  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Dapatkan nilai input
      const fullname = document.getElementById('cust-name').value.trim();
      const phone = document.getElementById('cust-phone').value.trim();
      const packageSelected = document.getElementById('cust-package').value;
      let quantity = document.getElementById('cust-quantity').value.trim();
      if (!quantity || parseInt(quantity, 10) < 1) quantity = '1';
      const address = document.getElementById('cust-address').value.trim();
      const notes = document.getElementById('cust-notes').value.trim() || 'Tiada';

      // 1. Sahkan medan wajib telah diisi
      if (!fullname) {
        alert('Sila masukkan Nama Penuh anda.');
        document.getElementById('cust-name').focus();
        return;
      }

      if (!phone) {
        alert('Sila masukkan Nombor Telefon anda.');
        document.getElementById('cust-phone').focus();
        return;
      }

      if (!packageSelected) {
        alert('Sila pilih Pakej.');
        document.getElementById('cust-package').focus();
        return;
      }

      if (!address) {
        alert('Sila masukkan Alamat Penghantaran yang lengkap.');
        document.getElementById('cust-address').focus();
        return;
      }

      // 2. Bina mesej WhatsApp yang tersusun mengikut format yang dikehendaki:
      // Tempahan Kapsul Resdung SB
      // Nama: [nama]
      // No. telefon: [nombor telefon]
      // Pakej: [pakej]
      // Kuantiti: [kuantiti]
      // Alamat penghantaran: [alamat]
      // Catatan: [catatan]
      const waMessage = 
`Tempahan Kapsul Resdung SB
Nama: ${fullname}
No. telefon: ${phone}
Pakej: ${packageSelected}
Kuantiti: ${quantity}
Alamat penghantaran: ${address}
Catatan: ${notes}`;

      // 3. Paparkan mesej ringkas bahawa WhatsApp akan dibuka untuk pelanggan menyemak dan menghantar tempahan
      showToast('Membuka WhatsApp 013-473 8701... Sila semak mesej dan tekan "Send".');

      // 4. Buka WhatsApp dengan format https://wa.me/60134738701?text= (di-encode dengan betul)
      // *Nota: Maklumat pelanggan TIDAK disimpan ke mana-mana pangkalan data
      const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(waMessage)}`;

      // Buka tetingkap WhatsApp
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 500);
    });
  }

  // 6. FAQ ACCORDION
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(other => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 7. TESTIMONIAL TABS (VIDEO vs WHATSAPP)
  const tabBtns = document.querySelectorAll('.testi-tab-btn');
  const tabPanes = document.querySelectorAll('.testi-tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      tabPanes.forEach(pane => {
        if (pane.id === targetTab) {
          pane.style.display = 'block';
        } else {
          pane.style.display = 'none';
        }
      });
    });
  });

  // 8. LIGHTBOX MODAL UNTUK SIJIL & TESTIMONI
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close-btn');
  const triggerImages = document.querySelectorAll('[data-lightbox-src]');

  function openLightbox(src) {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  triggerImages.forEach(elem => {
    elem.addEventListener('click', () => {
      const src = elem.getAttribute('data-lightbox-src') || elem.querySelector('img')?.src;
      if (src) openLightbox(src);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });

  // 9. SMOOTH SCROLL UNTUK SEMUA PAUTAN ANCHOR
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });



  const videoTabBtns = document.querySelectorAll('.video-tab-btn');
  videoTabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      window.switchSuitableVideo(this);
    });
  });

  // Inisialisasi Ringkasan Pesanan Awal
  updateOrderSummary();
});
