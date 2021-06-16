import React from "react";
import {
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

const getCantPages = (cant) => (cant % 2 ? cant : cant + 1);
const getMiddle = (cant) => parseInt(getCantPages(cant) / 2);

export default function PaginationComponent({ pagination, cantPages = 10 }) {
  
  return(
  <>
    
    {pagination && (
      <Col xs="12" sm="12" md="12" className="d-flex justify-content-center">
        <Pagination aria-label="Page navigation example">
          {(pagination.currentPage && (
            <>
              <PaginationItem>
                <PaginationLink
                  first
                  onClick={(e) => pagination.onPagination(e, 0)}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  previous
                  onClick={(e) =>
                    pagination.onPagination(e, pagination.currentPage - 1)
                  }
                />
              </PaginationItem>
            </>
          )) ||
            ""}
          {[
            ...Array(
              pagination.totalPages > getCantPages(cantPages)
                ? getCantPages(cantPages)
                : pagination.totalPages
            ),
          ].map((_, i) => {
            const { currentPage, totalPages } = pagination;
            const newCantPages = getCantPages(cantPages);
            const isTotalGrater = totalPages > newCantPages;
            const middle = getMiddle(cantPages);
            let active = false;
            let label = 0;
            let clickPage = 0;
            if (isTotalGrater) {
              if (currentPage <= middle) {
                active = i === currentPage;
                clickPage = i;
                if (i === newCantPages - 1) label = "...";
                else label = i + 1;
              } else {
                const base = currentPage - middle;
                if (!i) {
                  active = false;
                  clickPage = base + 1;
                  label = "...";
                } else {
                  const showLast = currentPage + middle >= totalPages - 1;
                  const newBase = totalPages - newCantPages;
                  if (i === newCantPages - 1) {
                    active = currentPage === totalPages - 1;
                    if (showLast) {
                      label = newBase + i + 1;
                      clickPage = newBase + i;
                    } else {
                      label = "...";
                      clickPage = base + i;
                    }
                  } else {
                    if (showLast) {
                      active = i + newBase === currentPage;
                      label = newBase + i + 1;
                      clickPage = newBase + i;
                    } else {
                      active = i + base === currentPage;
                      label = base + i + 1;
                      clickPage = base + i;
                    }
                  }
                }
              }
            } else {
              active = i === currentPage;
              clickPage = i;
              label = i + 1;
            }
            return (
              <PaginationItem key={i} active={active}>
                <PaginationLink
                  onClick={(e) => pagination.onPagination(e, clickPage)}
                  href="#"
                >
                  {label}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          {(pagination.totalPages &&
            pagination.currentPage !== pagination.totalPages - 1 && (
              <>
                <PaginationItem>
                  <PaginationLink
                    next
                    onClick={(e) =>
                      pagination.onPagination(e, pagination.currentPage + 1)
                    }
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    last
                    onClick={(e) =>
                      pagination.onPagination(e, pagination.totalPages - 1)
                    }
                  />
                </PaginationItem>
              </>
            )) ||
            ""}
        </Pagination>
      </Col>
    )}
  </>
)};
